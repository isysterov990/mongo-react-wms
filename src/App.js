import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/productCard";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
  fetch("http://localhost:8000/products", {
    method:"GET"
  }).then(response => response.json())
  .then(data => {
    console.log(data);
    setData(data);
  })
  .catch((err) => {
         console.log(err.message);
  });
  }, []);

  return (
  <div className="productCardContainer">
    {data ? (
      data.products.map((product) => (
        <ProductCard product={product} />
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default App;

