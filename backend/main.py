from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
from auth import router as auth_router
from recommendation import router as recommend_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],       # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],       # Allow all headers
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(recommend_router, prefix="/recommend")
