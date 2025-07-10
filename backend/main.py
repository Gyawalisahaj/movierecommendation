from fastapi import FastAPI
from recommendation import router as recommend_router  
from . import models, database
from .auth import router as auth_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(recommend_router, prefix="/recommend")

