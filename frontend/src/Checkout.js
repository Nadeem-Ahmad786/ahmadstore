import React, {useEffect, useState,useContext } from "react";
import CartItem from './components/cartItem';
import { Button } from "./styles/Button";
import { UserContext } from './App';
import PayButton from "./components/PayButton"
const Cart = () => {
  const {state, dispatch} = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [tmpadrress, settmpAddress] = useState(state[1].address)
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
  const PostAddress = async(e) =>{
    e.preventDefault();
    const user_id = state[1]._id;
    settmpAddress(document.getElementById("address").value);
    const address = document.getElementById("address").value;
    const res = await fetch("/saveAddress", {
     method: "POST",
     headers: {
         "Content-Type" : "application/json"
     },
     body: JSON.stringify({
         user_id, address
     })
    }) ;
    const data = await res.json();
         if( data.status === 400 || !data){
             window.alert(data.message)
         }
         else{
             window.alert(data.message);
         }
 }
  const inlineCss = { 
    position: "fixed",
    bottom: 0,width: "100%",
    backgroundColor: "#fff",
    borderTop: "1px solid #f0f0f0",
    boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
    padding: "16px 22px"
  }
  // const addressCss ={
  //   backgroundColor: "white",
  //   height: "auto",
  //   width: "51%",
  //   border: "1px solid black",
  //   borderRadius: "1rem",
  //   boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)",
  //   position: "absolute",
  //   zIndex: "10000",
  //   top: "50%",
  //   left: "25%",
  // }

  let total = cartProducts.reduce((total, cartProduct)=>  total + (cartProduct.productPrice* cartProduct.quantity), 0 );

console.log(cartProducts);
  return (
    <div className="mar">
    <div className="ordersummary">Order Summary</div>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
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
      </div>
      <div className='col-3 text-center'>
            <p style={{paddingTop: "30px"}}>PRICE DETAIL</p>
            <hr />
            <p>Price ({cartProducts.length} items)</p> 
            <p>Total Amount ₹ {total}</p>
      </div>
      </div>
      </div>




      {tmpadrress.length===0 ?<div className="text-center hide-show" id="addressCss" >
    <form className="product" method="post">
        <input type="text" name="address" id="address" className="form-control address" placeholder=" Enter Your Delivery Address" required/>
        <Button onClick={PostAddress} className="add_save" style={{marginTop: "1rem"}}>Save</Button>
      </form>
      <PayButton cartItems = {cartProducts}/>
      </div>
  :<div className="text-center hide-show" id="addressCss">
    <p className="product">Your Delivery Address : <b>{tmpadrress}</b></p>
    <form className="product" method="post">
        <input type="text" name="address" id="address" className="form-control address" placeholder="Want to Update Your Delivery Address"/>
        <Button onClick={PostAddress} className="add_save" style={{marginTop: "1rem"}}>Save</Button>
      </form>
      <PayButton cartItems = {cartProducts}/>
      </div>}
      {cartProducts.length>0 && <div style={inlineCss}><div style={{display: "block", textAlign: 'right'}}><input type="hidden" name="domain" value="physical" /> <Button onClick={()=>{document.getElementById("addressCss").style.display="block"}}>Proceed</Button></div></div>}
      </div>
  )
}

export default Cart;