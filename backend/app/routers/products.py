from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Product, Category
from ..schemas import ProductOut, ProductCreate, ProductUpdate, CategoryOut

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("", response_model=List[ProductOut])
def list_products(
    category_id: Optional[int] = None,
    category_slug: Optional[str] = None,
    search: Optional[str] = None,
    featured: Optional[bool] = None,
    in_stock_only: bool = False,
    sort_by: Optional[str] = Query(None, pattern="^(price_asc|price_desc|name|popular)$"),
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    
    if category_id:
        query = query.filter(Product.category_id == category_id)
    elif category_slug:
        cat = db.query(Category).filter(Category.slug == category_slug).first()
        if cat:
            query = query.filter(Product.category_id == cat.id)

    if featured is not None:
        query = query.filter(Product.is_featured == featured)

    if in_stock_only:
        query = query.filter(Product.in_stock == True)

    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter(
            (Product.name.ilike(search_fmt)) |
            (Product.brand.ilike(search_fmt)) |
            (Product.telugu_name.ilike(search_fmt))
        )

    if sort_by == "price_asc":
        query = query.order_by(Product.hub_price.asc())
    elif sort_by == "price_desc":
        query = query.order_by(Product.hub_price.desc())
    elif sort_by == "name":
        query = query.order_by(Product.name.asc())
    else:
        query = query.order_by(Product.is_featured.desc(), Product.id.asc())

    products = query.all()
    # Compute savings percentage for each product
    for p in products:
        if p.mrp and p.mrp > p.hub_price:
            p.savings_percent = round(((p.mrp - p.hub_price) / p.mrp) * 100, 1)
        else:
            p.savings_percent = 0.0

    return products


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.mrp and product.mrp > product.hub_price:
        product.savings_percent = round(((product.mrp - product.hub_price) / product.mrp) * 100, 1)
    return product


@router.post("", response_model=ProductOut)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    cat = db.query(Category).filter(Category.id == payload.category_id).first()
    if not cat:
        raise HTTPException(status_code=400, detail="Invalid category ID")
    
    prod = Product(**payload.model_dump())
    db.add(prod)
    db.commit()
    db.refresh(prod)
    return prod


@router.put("/{product_id}", response_model=ProductOut)
def update_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product removed successfully", "id": product_id}


# Router for Categories
category_router = APIRouter(prefix="/categories", tags=["Categories"])

@category_router.get("", response_model=List[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(Category).order_by(Category.display_order.asc()).all()
