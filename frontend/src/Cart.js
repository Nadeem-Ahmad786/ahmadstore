import React, {useEffect, useState}from 'react'
import { NavLink } from 'react-router-dom';
import CartItem from './components/cartItem';
import { Button } from "./styles/Button";
const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    fetch("/cart", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        credentials: "include"
    }).then((res) => res.json())
      .then((products) => {
          setCartProducts(products);
    }).catch((err) =>{
        console.log(err);
    });
  });
  // console.log(cartProducts);
  const inlineCss = { 
    position: "fixed",
    bottom: 0,width: "100%",
    backgroundColor: "#fff",
    borderTop: "1px solid #f0f0f0",
    boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
    padding: "16px 22px"
  }
  
  return (
    <>
      {cartProducts.map((cartProduct) =>(
        <CartItem 
          key={cartProduct.productId}
          product_id = {cartProduct.productId}
          productName ={cartProduct.productName}
          productImage ={cartProduct.productImage}
          productPrice ={cartProduct.productPrice}
          quantity ={cartProduct.quantity}
        />
        
      ))}
      <div class="last-item"></div>
      {cartProducts.length>0 && <div style={inlineCss}><form style={{display: "block", textAlign: 'right'}}><input type="hidden" name="domain" value="physical" /><NavLink to="/checkout"><Button >Check Out</Button></NavLink></form></div>}
      </>
  )
}

export default Cart