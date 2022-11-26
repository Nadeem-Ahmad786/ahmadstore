import React, {useEffect, useState, useContext} from 'react'
import Card from "./components/Card";
import { UserContext } from './App';

const Products = () => {
  const {state, dispatch} = useContext(UserContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/products/all", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        credentials: "include"
    }).then((res) => res.json())
      .then((products) => {
          setProducts(products);
    }).catch((err) =>{
        console.log(err);
    });
  },[]);
  return (
    <div className='rapper'>
    {products.map((product) => (
        <Card
          key = {product._id}
          product_id = {product._id}          
          img={product.productImage}
          title={product.productName}
          description={product.productDescription}
          price= {product.productPrice}
          features = {product.productFeatures}
          colors = {product.productColors}
        />

    ))}
    </div>
  )
}

export default Products;
