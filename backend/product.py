from pymongo import MongoClient
import json 
from bson import json_util

def connectDatabase():
    CONNECTION_STRING = "mongodb+srv://User1:stjSpclW6jUZchwV@warehousedb.v2d0of5.mongodb.net/test"
    client = MongoClient(CONNECTION_STRING)
    db = client['Warehouse']
    collection = db['Product']
    supplier_collection = db['Supplier']
    return collection, supplier_collection

def insertProduct(product_id: int, name: str, price: float, description: str, category: str, quantity: int, supplier_id: int, supplier_name: str, supplier_email: str, supplier_phone: str):
    collection, supplier_collection = connectDatabase()
      # check if supplier with the same supplier_id already exists
    existing_product = collection.find_one({"product_id": product_id})
    if existing_product:
        raise ValueError(f"Product with ID {product_id} already exists.")
    
    # Check if supplier already exists
    existing_supplier = supplier_collection.find_one({"supplier_id": supplier_id})
    if existing_supplier:
        supplier = existing_supplier
    else:
        # Create new supplier if it doesn't exist
        supplier = {
            "supplier_id": supplier_id,
            "name": supplier_name,
            "email": supplier_email,
            "phone": supplier_phone
        }
        supplier_collection.insert_one(supplier)

    new_product = {
        "product_id": product_id,
        "name": name,
        "price": price,
        "description": description,
        "category": category,
        "quantity": quantity,
        "supplier": supplier
    }

    result = collection.insert_one(new_product)
    return str(result.inserted_id)


def getProducts():
    collection, supplier_collection = connectDatabase()    
    products = list(collection.find({}, {"_id": 0}))
    products = json.loads(json_util.dumps(products))
    return products

def getProduct_by_ID(product_id: int):
    collection, supplier_collection = connectDatabase()
    product = list(collection.find({"product_id": product_id}, {"_id": 0}))
    if not product:
        return None
    product = json.loads(json_util.dumps(product))
    return product

def deleteProduct(product_id: int):
    collection, supplier_collection = connectDatabase()
    product = {"product_id": product_id}
    collection.delete_one(product)
    return f"Product {product_id} deleted."
    
def updateProduct(product_id: int, name: str = None, price: float = None, description: str = None, category: str = None, quantity: int = None, supplier_id: int = None, supplier_name: str = None, supplier_email: str = None, supplier_phone: str = None):
    collection, supplier_collection = connectDatabase()
    update_dict = {}
    if name:
        update_dict['name'] = name
    if price:
        update_dict['price'] = price
    if description:
        update_dict['description'] = description
    if category:
        update_dict['category'] = category
    if quantity:
        update_dict['quantity'] = quantity
    if supplier_id or supplier_name or supplier_email or supplier_phone:
        supplier_dict = {}
        if supplier_id:
            supplier_dict['supplier_id'] = supplier_id
        if supplier_name:
            supplier_dict['name'] = supplier_name
        if supplier_email:
            supplier_dict['email'] = supplier_email
        if supplier_phone:
            supplier_dict['phone'] = supplier_phone
        update_dict['supplier'] = supplier_dict

    result = collection.update_one({"product_id": product_id}, {"$set": update_dict})
    return(f"Successfully updated product {product_id}")

