import motor.motor_asyncio
from pymongo import mongo_client
from bson.objectid import ObjectId
import random
MONGODB_CONNECTION = "mongodb+srv://User1:<password>@warehousedb.v2d0of5.mongodb.net/?retryWrites=true&w=majority"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_CONNECTION)
db = client.test
