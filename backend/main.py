""" Run the following command to get the API started
uvicorn main:app --reload
"""

# main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.warehouseRoute import router as WarehouseRouter
import motor.motor_asyncio

app = FastAPI()

app.include_router(WarehouseRouter, tags=["Products"], prefix="/products")


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "go to http://localhost:8000/docs"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)