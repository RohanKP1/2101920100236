import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MainPage.css';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);

  const fetchProducts = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0ODI0MjA4LCJpYXQiOjE3MjQ4MjM5MDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY4YmZkNDg0LTQyOTAtNDU0Mi04Y2U2LTY3NWQyYTczNWM3ZCIsInN1YiI6ImNzZTIxMTM1QGdsYml0bS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6InJvaGFua3AiLCJjbGllbnRJRCI6IjY4YmZkNDg0LTQyOTAtNDU0Mi04Y2U2LTY3NWQyYTczNWM3ZCIsImNsaWVudFNlY3JldCI6InZHUGx6RFhFaFdub1B5cVkiLCJvd25lck5hbWUiOiJSb2hhbiIsIm93bmVyRW1haWwiOiJjc2UyMTEzNUBnbGJpdG0uYWMuaW4iLCJyb2xsTm8iOiIyMTAxOTIwMTAwMjM2In0.Y-OywKSBd6X-EMuGWJfeOA3zFrpUWqCElmPltZbpa-E';
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const url = `http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      const response = await axios.get(url, { headers });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [top, minPrice, maxPrice]);

  return (
    <div className="main-page-container">
      <h1>Top Products</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number of products:
          <input
            type="number"
            value={top}
            onChange={(e) => setTop(Number(e.target.value))}
          />
        </label>
        <label>
          Minimum price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Maximum price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.productName}>
            <h2>{product.productName}</h2>
            <p>
              Price: <span className="price">${product.price.toFixed(2)}</span>
            </p>
            <p>
              Rating: <span className="rating">{product.rating.toFixed(2)}</span>
            </p>
            <p>
              Discount: <span className="discount">{product.discount.toFixed(2)}</span>
            </p>
            <p>Availability: {product.availability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;

