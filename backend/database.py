import motor.motor_asyncio
from pymongo import mongo_client
from bson.objectid import ObjectId
import random
MONGODB_CONNECTION = "mongodb+srv://wms-app:CR2EVheKzAwGnqJb@warehousedb.v2d0of5.mongodb.net/?retryWrites=true&w=majority"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_CONNECTION)
db = client.Warehouse
warehouse_collection = db.get_collection("Product")
print(warehouse_collection)


#Helper for product
def product_helper(product) -> dict:
    if product:
        return {
            "id": str(product["_id"]),
            "ProductName": (product["ProductName"]),
            "Price": product["Price"]
        }

async def retrieve_products():
    products = []
    async for product in warehouse_collection.find():
        products.append(product_helper(product))
    return products
