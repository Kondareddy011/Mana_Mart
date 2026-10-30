from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from ..database import get_db
from ..models import Order, OrderItem, Product, Category, Apartment, Batch
from ..schemas import DemandItemSummary, HouseholdPackingSlip, DashboardStats, OrderItemOut

router = APIRouter(prefix="/admin", tags=["Admin Operations"])

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(batch_id: Optional[int] = None, db: Session = Depends(get_db)):
    # Get current batch
    if batch_id:
        batch = db.query(Batch).filter(Batch.id == batch_id).first()
    else:
        batch = db.query(Batch).filter(Batch.is_active == True).order_by(Batch.id.desc()).first()

    order_query = db.query(Order)
    if batch:
        order_query = order_query.filter(Order.batch_id == batch.id)

    orders = order_query.all()
    
    total_orders = len(orders)
    gmv = sum(o.total_amount for o in orders)
    savings = sum(o.savings_amount for o in orders)

    # Compute total weight
    order_ids = [o.id for o in orders]
    total_weight = 0.0
    if order_ids:
        weight_sum = db.query(func.sum(OrderItem.total_weight_kg)).filter(OrderItem.order_id.in_(order_ids)).scalar()
        if weight_sum:
            total_weight = float(weight_sum)

    pending_payment = sum(1 for o in orders if o.payment_status == "PENDING_VERIFICATION")
    confirmed = sum(1 for o in orders if o.order_status in ["PAYMENT_CONFIRMED", "SUPPLIER_ORDER_FINALIZED"])
    packed = sum(1 for o in orders if o.order_status == "HUB_PACKED")
    delivered = sum(1 for o in orders if o.order_status == "DELIVERED")

    active_apts = db.query(Apartment).filter(Apartment.is_active == True).count()

    return DashboardStats(
        total_orders=total_orders,
        gross_merchandise_value=round(gmv, 2),
        total_community_savings=round(savings, 2),
        total_weight_kg=round(total_weight, 2),
        orders_pending_payment=pending_payment,
        orders_confirmed=confirmed,
        orders_packed=packed,
        orders_delivered=delivered,
        active_apartments_count=active_apts,
        current_batch_name=batch.name if batch else "No Active Batch",
        cutoff_date=batch.cutoff_date if batch else "-",
        delivery_date=batch.delivery_date if batch else "-"
    )


@router.get("/demand-summary", response_model=List[DemandItemSummary])
def get_combined_demand_summary(
    batch_id: Optional[int] = None,
    apartment_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """
    Combined Demand Aggregator:
    Calculates the exact total bags, tins, packets of groceries needed from suppliers/mandi
    across all customer orders in the batch.
    """
    order_query = db.query(Order.id).filter(Order.order_status != "CANCELLED")
    
    if batch_id:
        order_query = order_query.filter(Order.batch_id == batch_id)
    else:
        active_batch = db.query(Batch).filter(Batch.is_active == True).order_by(Batch.id.desc()).first()
        if active_batch:
            order_query = order_query.filter(Order.batch_id == active_batch.id)

    if apartment_id:
        order_query = order_query.filter(Order.apartment_id == apartment_id)

    order_ids = [r[0] for r in order_query.all()]

    if not order_ids:
        return []

    # Aggregate item quantities
    aggregated = db.query(
        OrderItem.product_id,
        func.sum(OrderItem.quantity).label("total_units"),
        func.sum(OrderItem.total_weight_kg).label("total_weight"),
        func.sum(OrderItem.line_total).label("total_revenue")
    ).filter(OrderItem.order_id.in_(order_ids)).group_by(OrderItem.product_id).all()

    summary_list = []
    for row in aggregated:
        prod = db.query(Product).filter(Product.id == row.product_id).first()
        if not prod:
            continue
        
        category_name = prod.category.name if prod.category else "General"
        units = int(row.total_units)
        weight = float(row.total_weight or 0.0)
        revenue = float(row.total_revenue or 0.0)
        total_supplier_cost = round(prod.supplier_cost * units, 2)
        margin = round(revenue - total_supplier_cost, 2)

        summary_list.append(DemandItemSummary(
            product_id=prod.id,
            product_name=prod.name,
            category_name=category_name,
            brand=prod.brand,
            pack_size=prod.pack_size,
            total_units_needed=units,
            total_weight_kg=round(weight, 2),
            mrp=prod.mrp,
            hub_price=prod.hub_price,
            supplier_unit_cost=prod.supplier_cost,
            total_supplier_cost=total_supplier_cost,
            total_retail_revenue=round(revenue, 2),
            estimated_margin=margin
        ))

    # Sort by total units desc
    summary_list.sort(key=lambda x: x.total_units_needed, reverse=True)
    return summary_list


@router.get("/packing-slips", response_model=List[HouseholdPackingSlip])
def get_packing_slips(
    batch_id: Optional[int] = None,
    apartment_id: Optional[int] = None,
    order_status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Household Packing Lists:
    Generates flat-by-flat packing sheets with item checklists for hub workers & volunteers.
    """
    order_query = db.query(Order).filter(Order.order_status != "CANCELLED")

    if batch_id:
        order_query = order_query.filter(Order.batch_id == batch_id)
    else:
        active_batch = db.query(Batch).filter(Batch.is_active == True).order_by(Batch.id.desc()).first()
        if active_batch:
            order_query = order_query.filter(Order.batch_id == active_batch.id)

    if apartment_id:
        order_query = order_query.filter(Order.apartment_id == apartment_id)

    if order_status:
        order_query = order_query.filter(Order.order_status == order_status)

    orders = order_query.order_by(Order.apartment_id.asc(), Order.tower_block.asc(), Order.flat_number.asc()).all()

    slips = []
    for order in orders:
        apt_name = order.apartment.name if order.apartment else "Apartment"
        apt_area = order.apartment.area if order.apartment else "Vijayawada"
        total_weight = sum(item.total_weight_kg for item in order.items)

        items_out = [OrderItemOut.model_validate(item) for item in order.items]

        slips.append(HouseholdPackingSlip(
            order_id=order.id,
            order_code=order.order_code,
            resident_name=order.resident_name,
            phone=order.phone,
            apartment_name=apt_name,
            area=apt_area,
            tower_block=order.tower_block,
            flat_number=order.flat_number,
            order_status=order.order_status,
            payment_status=order.payment_status,
            payment_method=order.payment_method,
            total_amount=order.total_amount,
            total_weight_kg=round(total_weight, 2),
            special_notes=order.special_notes,
            items=items_out
        ))

    return slips


@router.post("/batch-bulk-update-status")
def batch_bulk_update_status(
    batch_id: int,
    from_status: str,
    to_status: str,
    db: Session = Depends(get_db)
):
    """
    Bulk progress all orders in a batch from one phase to next:
    e.g. PAYMENT_CONFIRMED -> SUPPLIER_ORDER_FINALIZED -> HUB_PACKED -> DELIVERED
    """
    orders = db.query(Order).filter(
        Order.batch_id == batch_id,
        Order.order_status == from_status
    ).all()

    count = 0
    for order in orders:
        order.order_status = to_status
        count += 1
    
    db.commit()
    return {"message": f"Updated {count} orders to {to_status}", "count": count}
