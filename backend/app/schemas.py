from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# Category Schemas
class CategoryBase(BaseModel):
    slug: str
    name: str
    telugu_name: Optional[str] = None
    icon: Optional[str] = "Package"
    display_order: int = 0

class CategoryOut(CategoryBase):
    id: int
    class Config:
        from_attributes = True

# Product Schemas
class ProductBase(BaseModel):
    name: str
    telugu_name: Optional[str] = None
    category_id: int
    brand: str
    pack_size: str
    unit_weight_kg: float = 1.0
    mrp: float
    hub_price: float
    supplier_cost: float
    in_stock: bool = True
    is_featured: bool = False
    is_bundle_item: bool = False
    image_url: str
    description: Optional[str] = None
    min_qty: int = 1
    max_qty: int = 10

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    telugu_name: Optional[str] = None
    category_id: Optional[int] = None
    brand: Optional[str] = None
    pack_size: Optional[str] = None
    unit_weight_kg: Optional[float] = None
    mrp: Optional[float] = None
    hub_price: Optional[float] = None
    supplier_cost: Optional[float] = None
    in_stock: Optional[bool] = None
    is_featured: Optional[bool] = None
    is_bundle_item: Optional[bool] = None
    image_url: Optional[str] = None
    description: Optional[str] = None

class ProductOut(ProductBase):
    id: int
    category: Optional[CategoryOut] = None
    savings_percent: Optional[float] = None

    class Config:
        from_attributes = True

# Apartment Schemas
class ApartmentBase(BaseModel):
    name: str
    area: str
    city: str = "Vijayawada"
    pincode: str = "520010"
    total_flats: int = 100
    registered_families: int = 15
    coordinator_name: Optional[str] = None
    coordinator_phone: Optional[str] = None
    delivery_slot_info: Optional[str] = "Free Bulk Delivery on Batch Day"
    is_active: bool = True

class ApartmentCreate(ApartmentBase):
    pass

class ApartmentOut(ApartmentBase):
    id: int
    active_orders_count: Optional[int] = 0

    class Config:
        from_attributes = True

# Batch Schemas
class BatchBase(BaseModel):
    name: str
    cutoff_date: str
    delivery_date: str
    status: str = "ACCEPTING_ORDERS"
    notes: Optional[str] = None
    is_active: bool = True

class BatchCreate(BatchBase):
    pass

class BatchOut(BatchBase):
    id: int
    total_orders_in_batch: Optional[int] = 0

    class Config:
        from_attributes = True

# Order Schemas
class OrderItemIn(BaseModel):
    product_id: int
    quantity: int

class OrderItemOut(BaseModel):
    id: int
    product_id: int
    product_name: str
    pack_size: str
    unit_price: float
    supplier_unit_cost: float
    quantity: int
    line_total: float
    total_weight_kg: float

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    batch_id: int
    apartment_id: int
    tower_block: str
    flat_number: str
    resident_name: str
    phone: str
    email: Optional[str] = None
    payment_method: str = "UPI_VERIFIED"
    upi_reference: Optional[str] = None
    special_notes: Optional[str] = None
    items: List[OrderItemIn]

class OrderStatusUpdate(BaseModel):
    order_status: str

class PaymentStatusUpdate(BaseModel):
    payment_status: str
    upi_reference: Optional[str] = None

class OrderOut(BaseModel):
    id: int
    order_code: str
    batch_id: int
    apartment_id: int
    tower_block: str
    flat_number: str
    resident_name: str
    phone: str
    email: Optional[str] = None
    subtotal: float
    savings_amount: float
    delivery_fee: float
    total_amount: float
    payment_method: str
    payment_status: str
    upi_reference: Optional[str] = None
    order_status: str
    special_notes: Optional[str] = None
    created_at: datetime
    apartment: Optional[ApartmentOut] = None
    batch: Optional[BatchOut] = None
    items: List[OrderItemOut] = []

    class Config:
        from_attributes = True

# Combined Demand Procurement Summary
class DemandItemSummary(BaseModel):
    product_id: int
    product_name: str
    category_name: str
    brand: str
    pack_size: str
    total_units_needed: int
    total_weight_kg: float
    mrp: float
    hub_price: float
    supplier_unit_cost: float
    total_supplier_cost: float
    total_retail_revenue: float
    estimated_margin: float

# Household Packing Slip
class HouseholdPackingSlip(BaseModel):
    order_id: int
    order_code: str
    resident_name: str
    phone: str
    apartment_name: str
    area: str
    tower_block: str
    flat_number: str
    order_status: str
    payment_status: str
    payment_method: str
    total_amount: float
    total_weight_kg: float
    special_notes: Optional[str] = None
    items: List[OrderItemOut]

# Dashboard KPIs
class DashboardStats(BaseModel):
    total_orders: int
    gross_merchandise_value: float
    total_community_savings: float
    total_weight_kg: float
    orders_pending_payment: int
    orders_confirmed: int
    orders_packed: int
    orders_delivered: int
    active_apartments_count: int
    current_batch_name: str
    cutoff_date: str
    delivery_date: str
