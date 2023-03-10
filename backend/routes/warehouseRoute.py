from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from backend.database import (
    retrieve_products
)

from backend.models.warehouseModel import (
    ResponseModel,
    ErrorResposeModel
)

router = APIRouter()

@router.get("/", response_description="Products retrived")
async def get_products():
    products = await retrieve_products()
    if products:
        return ResponseModel(products, "data retrieval successful")
    return ResponseModel(products, "no data retrieved")