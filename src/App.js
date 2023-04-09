import React, {useEffect, useState} from "react";
import BasicTabs from "./components/tabs";

function App() {
    const [productsData, setProductsData] = useState(null);
    const [customersData, setCustomersData] = useState(null);
    const [ordersData, setOrdersData] = useState(null);
    const [suppliersData, setSupplierData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/products", {
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setProductsData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        fetch("http://localhost:8000/customers", {
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setCustomersData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        fetch("http://localhost:8000/orders", {
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setOrdersData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        fetch("http://localhost:8000/suppliers", {
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setSupplierData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    },[])


    return (
        <div>
            <BasicTabs productsData={productsData}
                       customersData={customersData}
                       ordersData={ordersData}
                       suppliersData={suppliersData}
            />
        </div>
    );
}

export default App;

