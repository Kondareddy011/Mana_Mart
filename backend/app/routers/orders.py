import random
import string
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Order, OrderItem, Product, Apartment, Batch
from ..schemas import OrderCreate, OrderOut, OrderStatusUpdate, PaymentStatusUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])

def generate_order_code() -> str:
    # Generates a professional order code like CGH-VIJ-4819
    digits = ''.join(random.choices(string.digits, k=4))
    return f"CGH-VIJ-{digits}"

@router.post("", response_model=OrderOut)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    # Validate apartment
    apt = db.query(Apartment).filter(Apartment.id == payload.apartment_id).first()
    if not apt:
        raise HTTPException(status_code=400, detail="Invalid apartment selected")

    # Validate batch
    batch = db.query(Batch).filter(Batch.id == payload.batch_id).first()
    if not batch:
        batch = db.query(Batch).filter(Batch.is_active == True).order_by(Batch.id.desc()).first()
        if not batch:
            raise HTTPException(status_code=400, detail="No active batch available")

    if not payload.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    # Calculate totals
    subtotal = 0.0
    total_mrp = 0.0
    items_to_create = []

    for item_in in payload.items:
        if item_in.quantity <= 0:
            continue
        prod = db.query(Product).filter(Product.id == item_in.product_id).first()
        if not prod:
            raise HTTPException(status_code=400, detail=f"Product with id {item_in.product_id} not found")
        
        line_total = prod.hub_price * item_in.quantity
        subtotal += line_total
        total_mrp += (prod.mrp * item_in.quantity)
        total_weight = (prod.unit_weight_kg or 1.0) * item_in.quantity

        items_to_create.append({
            "product_id": prod.id,
            "product_name": prod.name,
            "pack_size": prod.pack_size,
            "unit_price": prod.hub_price,
            "supplier_unit_cost": prod.supplier_cost,
            "quantity": item_in.quantity,
            "line_total": line_total,
            "total_weight_kg": total_weight
        })

    savings = max(0.0, total_mrp - subtotal)
    delivery_fee = 0.0 # Free bulk delivery to apartment community

    # Unique code
    code = generate_order_code()
    while db.query(Order).filter(Order.order_code == code).first():
        code = generate_order_code()

    # Determine initial payment status
    payment_status = "PENDING_VERIFICATION"
    if payload.payment_method == "CASH_ON_DELIVERY" or payload.payment_method == "UPI_ON_DELIVERY":
        payment_status = "PAY_ON_DELIVERY"

    order = Order(
        order_code=code,
        batch_id=batch.id,
        apartment_id=apt.id,
        tower_block=payload.tower_block,
        flat_number=payload.flat_number,
        resident_name=payload.resident_name,
        phone=payload.phone,
        email=payload.email,
        subtotal=round(subtotal, 2),
        savings_amount=round(savings, 2),
        delivery_fee=delivery_fee,
        total_amount=round(subtotal + delivery_fee, 2),
        payment_method=payload.payment_method,
        payment_status=payment_status,
        upi_reference=payload.upi_reference,
        order_status="ORDER_PLACED",
        special_notes=payload.special_notes,
        created_at=datetime.utcnow()
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    # Insert items
    for item_data in items_to_create:
        order_item = OrderItem(order_id=order.id, **item_data)
        db.add(order_item)
    
    db.commit()
    db.refresh(order)
    return order


@router.get("", response_model=List[OrderOut])
def list_orders(
    apartment_id: Optional[int] = None,
    batch_id: Optional[int] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Order)

    if apartment_id:
        query = query.filter(Order.apartment_id == apartment_id)
    if batch_id:
        query = query.filter(Order.batch_id == batch_id)
    if status:
        query = query.filter(Order.order_status == status)
    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter(
            (Order.order_code.ilike(search_fmt)) |
            (Order.resident_name.ilike(search_fmt)) |
            (Order.phone.ilike(search_fmt)) |
            (Order.flat_number.ilike(search_fmt))
        )

    return query.order_by(Order.id.desc()).all()


@router.get("/track/{identifier}", response_model=List[OrderOut])
def track_orders(identifier: str, db: Session = Depends(get_db)):
    clean_id = identifier.strip()
    # Search by order_code or phone
    orders = db.query(Order).filter(
        (Order.order_code.ilike(clean_id)) | (Order.phone == clean_id)
    ).order_by(Order.id.desc()).all()
    return orders


@router.get("/{order_id}", response_model=OrderOut)
def get_order_by_id(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.put("/{order_id}/status", response_model=OrderOut)
def update_order_status(order_id: int, payload: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.order_status = payload.order_status
    if payload.order_status == "DELIVERED" and order.payment_status == "PAY_ON_DELIVERY":
        order.payment_status = "PAID_ON_DELIVERY"
    
    db.commit()
    db.refresh(order)
    return order


@router.put("/{order_id}/payment", response_model=OrderOut)
def update_payment_status(order_id: int, payload: PaymentStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.payment_status = payload.payment_status
    if payload.upi_reference:
        order.upi_reference = payload.upi_reference
    
    # Auto-progress to PAYMENT_CONFIRMED if order was in ORDER_PLACED
    if payload.payment_status == "VERIFIED" and order.order_status == "ORDER_PLACED":
        order.order_status = "PAYMENT_CONFIRMED"

    db.commit()
    db.refresh(order)
    return order
