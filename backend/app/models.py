from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Apartment(Base):
    __tablename__ = "apartments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    area = Column(String(100), nullable=False)
    city = Column(String(50), default="Vijayawada")
    pincode = Column(String(10), default="520010")
    total_flats = Column(Integer, default=100)
    registered_families = Column(Integer, default=15)
    coordinator_name = Column(String(100), nullable=True)
    coordinator_phone = Column(String(20), nullable=True)
    delivery_slot_info = Column(String(200), default="Free Bulk Drop to Clubhouse & Doorstep on Batch Delivery Day")
    is_active = Column(Boolean, default=True)

    orders = relationship("Order", back_populates="apartment")


class Batch(Base):
    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    cutoff_date = Column(String(50), nullable=False)
    delivery_date = Column(String(50), nullable=False)
    status = Column(String(50), default="ACCEPTING_ORDERS")
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)

    orders = relationship("Order", back_populates="batch")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    telugu_name = Column(String(100), nullable=True)
    icon = Column(String(50), default="Package")
    display_order = Column(Integer, default=0)

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    name = Column(String(200), nullable=False, index=True)
    telugu_name = Column(String(200), nullable=True)
    brand = Column(String(100), nullable=False)
    pack_size = Column(String(50), nullable=False)
    unit_weight_kg = Column(Float, default=1.0)
    mrp = Column(Float, nullable=False)
    hub_price = Column(Float, nullable=False)
    supplier_cost = Column(Float, nullable=False)
    in_stock = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    is_bundle_item = Column(Boolean, default=False)
    image_url = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    min_qty = Column(Integer, default=1)
    max_qty = Column(Integer, default=10)

    category = relationship("Category", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_code = Column(String(50), unique=True, index=True, nullable=False)
    batch_id = Column(Integer, ForeignKey("batches.id"), nullable=False)
    apartment_id = Column(Integer, ForeignKey("apartments.id"), nullable=False)
    tower_block = Column(String(50), nullable=False)
    flat_number = Column(String(50), nullable=False)
    resident_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False, index=True)
    email = Column(String(100), nullable=True)
    
    subtotal = Column(Float, nullable=False, default=0.0)
    savings_amount = Column(Float, nullable=False, default=0.0)
    delivery_fee = Column(Float, nullable=False, default=0.0)
    total_amount = Column(Float, nullable=False, default=0.0)
    
    payment_method = Column(String(50), default="UPI_VERIFIED")
    payment_status = Column(String(50), default="PENDING_VERIFICATION")
    upi_reference = Column(String(100), nullable=True)
    
    order_status = Column(String(50), default="ORDER_PLACED")
    special_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    apartment = relationship("Apartment", back_populates="orders")
    batch = relationship("Batch", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    product_name = Column(String(200), nullable=False)
    pack_size = Column(String(50), nullable=False)
    unit_price = Column(Float, nullable=False)
    supplier_unit_cost = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    line_total = Column(Float, nullable=False)
    total_weight_kg = Column(Float, default=1.0)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
