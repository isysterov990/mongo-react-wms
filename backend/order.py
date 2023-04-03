from pymongo import MongoClient
import json 
from bson import json_util

def connectDatabase():
    CONNECTION_STRING = "mongodb+srv://User1:stjSpclW6jUZchwV@warehousedb.v2d0of5.mongodb.net/test"
    client = MongoClient(CONNECTION_STRING)
    db = client['Warehouse']
    collection = db['Order']
    customer_collection = db['Customer']
    product_collection = db['Product']
    return collection, customer_collection, product_collection


def insertOrder(order_id: int, order_date: str, customer_id: int, customer_name: str, customer_email: str, customer_phone: str, shipping_address: dict, products: list):
    collection, customer_collection, product_collection = connectDatabase()
    # check if order with same order_id exists
    existing_order = collection.find_one({"order_id": order_id})
    if existing_order:
        raise ValueError(f"Order with order_id {order_id} already exists.")

    customer = customer_collection.find_one({"customer_id": customer_id})
    if not customer:
        # if customer does not exist, create a new customer
        customer = {"customer_id": customer_id, "name": customer_name, "email": customer_email, "phone": customer_phone, "shipping_address": shipping_address}
        customer_collection.insert_one(customer)

    product_list = []
    for product in products:
        product_id = product['product_id']
        existing_product = product_collection.find_one({"product_id": product_id})
        if existing_product:
            # if product exists, use existing product details
            product_dict = existing_product
        else:
            # if product does not exist, create a new product
            name = product['name']
            price = product['price']
            description = product['description'] if 'description' in product else None
            category = product['category'] if 'category' in product else None
            quantity = product['quantity'] if 'quantity' in product else None
            product_dict = {
                "product_id": product_id,
                "name": name,
                "price": price,
                "description": description,
                "category": category,
                "quantity": quantity
            }
            product_collection.insert_one(product_dict)

        # add product to product list
        product_dict['quantity'] = product['quantity']
        product_dict['price'] = product['price']
        product_list.append(product_dict)

    new_order = {
        "order_id": {"$numberInt": str(order_id)},
        "order_date": order_date,
        "customer": customer,
        "products": product_list
    }
    result = collection.insert_one(new_order)
    return str(result.inserted_id)


def getOrders():
    collection, customer_collection, product_collection = connectDatabase()
    orders = list(collection.find({}, {"_id": 0}))
    return json.loads(json_util.dumps(orders))

def getOrder_by_ID(order_id: int):
    collection, customer_collection, product_collection = connectDatabase()
    order = list(collection.find({"order_id": order_id}, {"_id": 0}))
    if not order:
        return None
    order = json.loads(json_util.dumps(order))
    return order


def deleteOrder(order_id: int):
    collection, customer_collection, product_collection = connectDatabase()
    order = {"order_id": order_id}
    collection.delete_one(order)
    return f"Order {order_id} deleted."


def updateOrder(order_id: int, order_date: str = None, customer_id: int = None, customer_name: str = None, customer_email: str = None, customer_phone: str = None, shipping_address: dict = None, products: list = None):
    collection, customer_collection, product_collection = connectDatabase()
    update_dict = {}
    if order_date:
        update_dict['order_date'] = order_date
    if customer_id or customer_name or customer_email or customer_phone or shipping_address:
        customer = {}
        if customer_id:
            customer['customer_id'] = customer_id
        if customer_name:
            customer['name'] = customer_name
        if customer_email:
            customer['email'] = customer_email
        if customer_phone:
            customer['phone'] = customer_phone
        if shipping_address:
            customer['shipping_address'] = shipping_address
        update_dict['customer'] = customer
    if products:
        product_list = []
        for product in products:
            product_dict = {"product_id": product['product_id'], "name": product['name'], "quantity": product['quantity'], "price": product['price']}
            product_list.append(product_dict)
        update_dict['products'] = product_list

    result = collection.update_one({"order_id": order_id}, {"$set": update_dict})
    return(f"Successfully updated order {order_id}")
