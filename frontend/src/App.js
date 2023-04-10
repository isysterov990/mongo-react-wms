import React, {useEffect, useState} from "react";
import BasicTabs from "./components/tabs";

function App() {
    const [productsData, setProductsData] = useState(null);
    const [customersData, setCustomersData] = useState(null);
    const [ordersData, setOrdersData] = useState(null);
    const [suppliersData, setSupplierData] = useState(null);
    const BASE_URL='https://wawmsproject-backend.azurewebsites.net'
    useEffect(() => {
        fetch(`${BASE_URL}/products`, {
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setProductsData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        fetch(`${BASE_URL}/customers`, {
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setCustomersData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        fetch(`${BASE_URL}/orders`, {
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setOrdersData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        fetch(`${BASE_URL}/suppliers`, {
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

