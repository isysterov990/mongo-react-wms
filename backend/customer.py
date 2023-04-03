from pymongo import MongoClient
import json 
from bson import json_util

def connectDatabase():
    CONNECTION_STRING = "mongodb+srv://User1:stjSpclW6jUZchwV@warehousedb.v2d0of5.mongodb.net/test"
    client = MongoClient(CONNECTION_STRING)
    db = client['Warehouse']
    collection = db['Customer']
    return collection

def insertCustomer(customer_id: int, name: str, email: str, phone: str, address: str, city: str, province: str, postal_code: str, country: str):
    collection = connectDatabase()
    existing_customer = collection.find_one({"customer_id": customer_id})
    if existing_customer:
        raise ValueError(f"Customer with id {customer_id} already exists")

    new_customer = {
        "customer_id": customer_id,
        "name": name,
        "email": email,
        "phone": phone,
        "shipping_address": {
            "address": address,
            "city": city,
            "province": province,
            "postal_code": postal_code,
            "country": country
        }
    }

    result = collection.insert_one(new_customer)
    return str(result.inserted_id)

def getCustomers():
    collection = connectDatabase()    
    customers = list(collection.find({}, {"_id": 0}))
    customers = json.loads(json_util.dumps(customers))
    return customers

def getCustomer_by_ID(customer_id: int):
    collection = connectDatabase()
    customer = list(collection.find({"customer_id": customer_id}, {"_id": 0}))
    if not customer:
        return None
    customer = json.loads(json_util.dumps(customer))
    return customer

def deleteCustomer(customer_id: int):
    collection = connectDatabase()
    customer = {"customer_id": customer_id}
    collection.delete_one(customer)
    return f"Customer {customer_id} deleted."
    
def updateCustomer(customer_id: int, name: str = None, email: str = None, phone: str = None, address: str = None, city: str = None, province: str = None, postal_code: str = None, country: str = None):
    collection = connectDatabase()
    update_dict = {}
    if name:
        update_dict['name'] = name
    if email:
        update_dict['email'] = email
    if phone:
        update_dict['phone'] = phone
    if address or city or province or postal_code or country:
        update_dict['shipping_address'] = {}
        if address:
            update_dict['shipping_address']['address'] = address
        if city:
            update_dict['shipping_address']['city'] = city
        if province:
            update_dict['shipping_address']['province'] = province
        if postal_code:
            update_dict['shipping_address']['postal_code'] = postal_code
        if country:
            update_dict['shipping_address']['country'] = country

    result = collection.update_one({"customer_id": customer_id}, {"$set": update_dict})
    return(f"Successfully updated customer {customer_id}")

