from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base, SessionLocal
from .seed_data import seed_database
from .routers import products, apartments, batches, orders, admin, auth

# Create database tables
Base.metadata.create_all(bind=engine)

# Seed database on startup
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

app = FastAPI(
    title=settings.APP_NAME,
    description="Full-stack API for Community Grocery Hub in Vijayawada - Apartment Bulk Buying & Mandi Procurement",
    version="1.0.0"
)

# CORS middleware for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under settings.API_V1_STR
app.include_router(products.router, prefix=settings.API_V1_STR)
app.include_router(products.category_router, prefix=settings.API_V1_STR)
app.include_router(apartments.router, prefix=settings.API_V1_STR)
app.include_router(batches.router, prefix=settings.API_V1_STR)
app.include_router(orders.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
app.include_router(auth.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "online",
        "app": settings.APP_NAME,
        "city": "Vijayawada",
        "docs_url": "/docs",
        "message": "Vijayawada Community Grocery Hub Backend API is running smoothly!"
    }
