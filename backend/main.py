""" Run the following command to get the API started
uvicorn main:app --reload
"""

from pymongo import MongoClient
from fastapi import FastAPI
from typing import List, Optional
import uvicorn
import json 
from bson import json_util
import customer
import product
import order
import supplier

app = FastAPI()

#Customer Endpoints
@app.post("/customers")
async def create_customer(customer_id: int, name: str, email: str, phone: str, address: str, city: str, province: str, postal_code: str, country: str):
    result = customer.insertCustomer(customer_id, name, email, phone, address, city, province, postal_code, country)
    return {"message": "Customer created successfully", "customer_id": result}

@app.get("/customers")
async def get_customers():
    result = customer.getCustomers()
    return {"customers": result}

@app.get("/customers/{customer_id}")
async def get_customer(customer_id: int):
    result = customer.getCustomer_by_ID(customer_id)
    if result:
        return {"customer": result}
    else:
        return {"message": "Customer not found"}

@app.put("/customers/{customer_id}")
async def update_customer(customer_id: int, name: Optional[str] = None, email: Optional[str] = None, phone: Optional[str] = None, address: Optional[str] = None, city: Optional[str] = None, province: Optional[str] = None, postal_code: Optional[str] = None, country: Optional[str] = None):
    result = customer.updateCustomer(customer_id, name, email, phone, address, city, province, postal_code, country)
    return {"message": result}

@app.delete("/customers/{customer_id}")
async def delete_customer(customer_id: int):
    result = customer.deleteCustomer(customer_id)
    return {"message": result}

#Product Endpoints
@app.post("/products")
async def create_product(product_id: int, name: str, price: float, description: str, category: str, quantity: int, supplier_id: int, supplier_name: str, supplier_email: str, supplier_phone: str):
    result = product.insertProduct(product_id, name, price, description, category, quantity, supplier_id, supplier_name, supplier_email, supplier_phone)
    return {"message": "Product created successfully", "product_id": result}

@app.get("/products")
async def get_products():
    result = product.getProducts()
    return {"products": result}

@app.get("/products/{product_id}")
async def get_product(product_id: int):
    result = product.getProduct_by_ID(product_id)
    if result:
        return {"product": result}
    else:
        return {"message": "Product not found"}

@app.put("/products/{product_id}")
async def update_product(product_id: int, name: Optional[str] = None, price: Optional[float] = None, description: Optional[str] = None, category: Optional[str] = None, quantity: Optional[int] = None, supplier_id: Optional[int] = None, supplier_name: Optional[str] = None, supplier_email: Optional[str] = None, supplier_phone: Optional[str] = None):
    result = product.updateProduct(product_id, name, price, description, category, quantity, supplier_id, supplier_name, supplier_email, supplier_phone)
    return {"message": result}

@app.delete("/products/{product_id}")
async def delete_product(product_id: int):
    result = product.deleteProduct(product_id)
    return {"message": result}

# Order Endpoints
@app.post("/orders")
async def create_order(order_id: int, order_date: str, customer_id: int, customer_name: str, customer_email: str, customer_phone: str, shipping_address: dict, products: list):
    result = order.insertOrder(order_id, order_date, customer_id, customer_name, customer_email, customer_phone, shipping_address, products)
    return {"message": "Order created successfully", "order_id": result}

@app.get("/orders")
async def get_orders():
    result = order.getOrders()
    return {"orders": result}

@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    result = order.getOrder_by_ID(order_id)
    if result:
        return {"order": result}
    else:
        return {"message": "Order not found"}

@app.put("/orders/{order_id}")
async def update_order(order_id: int, order_date: Optional[str] = None, customer_id: Optional[int] = None, customer_name: Optional[str] = None, customer_email: Optional[str] = None, customer_phone: Optional[str] = None, shipping_address: Optional[dict] = None, products: Optional[list] = None):
    result = order.updateOrder(order_id, order_date, customer_id, customer_name, customer_email, customer_phone, shipping_address, products)
    return {"message": result}

@app.delete("/orders/{order_id}")
async def delete_order(order_id: int):
    result = order.deleteOrder(order_id)
    return {"message": result}

# Supplier Endpoints
@app.post("/suppliers")
async def create_supplier(supplier_id: int, name: str, email: str, phone: str, products: List[dict]):
    result = supplier.insertSupplier(supplier_id, name, email, phone, products)
    return {"message": "Supplier created successfully", "supplier_id": result}

@app.get("/suppliers")
async def get_suppliers():
    result = supplier.getSuppliers()
    return {"suppliers": result}

@app.get("/suppliers/{supplier_id}")
async def get_supplier(supplier_id: int):
    result = supplier.getSupplier_by_ID(supplier_id)
    if result:
        return {"supplier": result}
    else:
        return {"message": "Supplier not found"}

@app.put("/suppliers/{supplier_id}")
async def update_supplier(supplier_id: int, name: Optional[str] = None, email: Optional[str] = None, phone: Optional[str] = None, products: Optional[List[dict]] = None):
    result = supplier.updateSupplier(supplier_id, name, email, phone, products)
    return {"message": result}

@app.delete("/suppliers/{supplier_id}")
async def delete_supplier(supplier_id: int):
    result = supplier.deleteSupplier(supplier_id)
    return {"message": result}

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "go to http://localhost:8000/docs"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
