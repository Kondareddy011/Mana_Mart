from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from ..config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class ResidentLoginRequest(BaseModel):
    phone: str
    apartment_id: int
    flat_number: str

@router.post("/admin-login")
def admin_login(payload: AdminLoginRequest):
    # Check credentials against environment / default configuration
    if payload.username.strip() == settings.ADMIN_USERNAME and payload.password.strip() == settings.ADMIN_PASSWORD:
        return {
            "success": True,
            "token": "admin-jwt-token-vijayawada-hub-2026",
            "role": "ADMIN",
            "user": {
                "name": "Hub Manager",
                "email": settings.ADMIN_USERNAME,
                "city": "Vijayawada"
            }
        }
    raise HTTPException(status_code=401, detail="Invalid admin credentials")


@router.post("/resident-login")
def resident_login(payload: ResidentLoginRequest):
    if len(payload.phone.strip()) < 10:
        raise HTTPException(status_code=400, detail="Invalid phone number")
    
    return {
        "success": True,
        "token": f"resident-token-{payload.phone.strip()}",
        "role": "RESIDENT",
        "user": {
            "phone": payload.phone.strip(),
            "apartment_id": payload.apartment_id,
            "flat_number": payload.flat_number.strip()
        }
    }
