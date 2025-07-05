from fastapi import FastAPI
from recommendation import router as recommend_router  

app = FastAPI()


app.include_router(recommend_router, prefix="/recommend")


