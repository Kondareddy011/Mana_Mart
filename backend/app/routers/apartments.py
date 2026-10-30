from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Apartment, Order
from ..schemas import ApartmentOut, ApartmentCreate

router = APIRouter(prefix="/apartments", tags=["Apartments"])

@router.get("/cities/all", response_model=List[str])
def get_available_cities(db: Session = Depends(get_db)):
    cities = db.query(Apartment.city).filter(Apartment.is_active == True).distinct().all()
    city_list = [c[0] for c in cities if c[0]]
    if not city_list:
        city_list = ["Hyderabad", "Vijayawada", "Guntur", "Visakhapatnam", "Tirupati"]
    return sorted(list(set(city_list)))

@router.get("", response_model=List[ApartmentOut])
def list_apartments(city: Optional[str] = Query(None, description="Filter apartments by city"), db: Session = Depends(get_db)):
    query = db.query(Apartment).filter(Apartment.is_active == True)
    if city and city.lower() != "all":
        query = query.filter(Apartment.city.ilike(f"%{city}%"))
    apts = query.order_by(Apartment.city.asc(), Apartment.name.asc()).all()
    results = []
    for apt in apts:
        order_count = db.query(Order).filter(Order.apartment_id == apt.id).count()
        apt_dict = ApartmentOut.model_validate(apt)
        apt_dict.active_orders_count = order_count
        results.append(apt_dict)
    return results

@router.get("/{apartment_id}", response_model=ApartmentOut)
def get_apartment(apartment_id: int, db: Session = Depends(get_db)):
    apt = db.query(Apartment).filter(Apartment.id == apartment_id).first()
    if not apt:
        raise HTTPException(status_code=404, detail="Apartment not found")
    apt_out = ApartmentOut.model_validate(apt)
    apt_out.active_orders_count = db.query(Order).filter(Order.apartment_id == apt.id).count()
    return apt_out

@router.post("", response_model=ApartmentOut)
def create_apartment(payload: ApartmentCreate, db: Session = Depends(get_db)):
    existing = db.query(Apartment).filter(Apartment.name.ilike(payload.name.strip())).first()
    if existing:
        return existing
    apt = Apartment(**payload.model_dump())
    db.add(apt)
    db.commit()
    db.refresh(apt)
    return apt
