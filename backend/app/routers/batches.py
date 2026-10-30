from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Batch, Order
from ..schemas import BatchOut, BatchCreate

router = APIRouter(prefix="/batches", tags=["Delivery Batches"])

@router.get("", response_model=List[BatchOut])
def list_batches(db: Session = Depends(get_db)):
    batches = db.query(Batch).order_by(Batch.id.desc()).all()
    results = []
    for b in batches:
        cnt = db.query(Order).filter(Order.batch_id == b.id).count()
        b_out = BatchOut.model_validate(b)
        b_out.total_orders_in_batch = cnt
        results.append(b_out)
    return results

@router.get("/current", response_model=BatchOut)
def get_current_batch(db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.is_active == True).order_by(Batch.id.desc()).first()
    if not batch:
        batch = Batch(
            name="Upcoming Monthly Batch (Vijayawada)",
            cutoff_date="30th of this month",
            delivery_date="1st Sunday of next month",
            status="ACCEPTING_ORDERS",
            is_active=True
        )
        db.add(batch)
        db.commit()
        db.refresh(batch)
    
    b_out = BatchOut.model_validate(batch)
    b_out.total_orders_in_batch = db.query(Order).filter(Order.batch_id == batch.id).count()
    return b_out

@router.post("", response_model=BatchOut)
def create_batch(payload: BatchCreate, db: Session = Depends(get_db)):
    batch = Batch(**payload.model_dump())
    db.add(batch)
    db.commit()
    db.refresh(batch)
    return batch

@router.put("/{batch_id}/status", response_model=BatchOut)
def update_batch_status(batch_id: int, status: str, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    batch.status = status
    db.commit()
    db.refresh(batch)
    return batch
