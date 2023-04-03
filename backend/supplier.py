from pymongo import MongoClient
import json 
from bson import json_util

def connectDatabase():
    CONNECTION_STRING = "mongodb+srv://User1:stjSpclW6jUZchwV@warehousedb.v2d0of5.mongodb.net/test"
    client = MongoClient(CONNECTION_STRING)
    db = client['Warehouse']
    collection = db['Supplier']
    product_collection = db['Product']
    return collection, product_collection

def insertSupplier(supplier_id: int, name: str, email: str, phone: str, products: list):
    collection, product_collection = connectDatabase()
    # check if supplier with the same supplier_id already exists
    existing_supplier = collection.find_one({"supplier_id": supplier_id})
    if existing_supplier:
        raise ValueError(f"Supplier with ID {supplier_id} already exists.")
    
    product_list = []
    for product in products:
        existing_product = product_collection.find_one({"product_id": product["product_id"]})
        if existing_product:
            # if product exists, use existing product details
            product_dict = existing_product
        else:
            # if product does not exist, create a new product
            product_dict = {
                "product_id": product['product_id'],
                "name": product['name'],
                "quantity": product['quantity'],
                "price": product['price'],
                "description": product['description'],
                "category": product['category']
            }
            product_collection.insert_one(product_dict)

        # add product to supplier's product list
        product_list.append(product_dict)

  
    new_supplier = {
        "supplier_id": supplier_id,
        "name": name,
        "email": email,
        "phone": phone,
        "products": product_list
    }
    collection.insert_one(new_supplier)
    return f"Successfully inserted supplier {supplier_id}."


def getSuppliers():
    collection, product_collection = connectDatabase()    
    suppliers = list(collection.find({}, {"_id": 0}))
    suppliers = json.loads(json_util.dumps(suppliers))
    return suppliers

def getSupplier_by_ID(supplier_id: int):
    collection, product_collection = connectDatabase()
    supplier = list(collection.find({"supplier_id": supplier_id}, {"_id": 0}))
    if not supplier:
        return None
    supplier = json.loads(json_util.dumps(supplier))
    return supplier

def deleteSupplier(supplier_id: int):
    collection, product_collection = connectDatabase()
    supplier = {"supplier_id": supplier_id}
    collection.delete_one(supplier)
    return f"Supplier {supplier_id} deleted."

def updateSupplier(supplier_id: int, name: str = None, email: str = None, phone: str = None, products: list = None):
    collection, product_collection = connectDatabase()
    update_dict = {}
    if name:
        update_dict['name'] = name
    if email:
        update_dict['email'] = email
    if phone:
        update_dict['phone'] = phone
    if products:
        product_list = []
        for product in products:
            product_dict = {"product_id": product['product_id'], "name": product['name'], "quantity": product['quantity'], "price": product['price']}
            product_list.append(product_dict)
        update_dict['products'] = product_list
    
    result = collection.update_one({"supplier_id": supplier_id}, {"$set": update_dict})
    return(f"Successfully updated supplier {supplier_id}.")

