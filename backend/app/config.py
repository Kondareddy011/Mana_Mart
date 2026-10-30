import os
from pydantic import BaseModel

class Settings(BaseModel):
    APP_NAME: str = "Mana Grocery Hub - Vijayawada"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./grocery_hub.db")
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin@groceryhub.in")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "Vijayawada2026!")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-vijayawada-grocery-key-2026")
    DEFAULT_CITY: str = "Vijayawada"

settings = Settings()
