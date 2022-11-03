import React, {useEffect, useContext } from 'react';
import { UserContext } from '../App';

import { Button } from "../styles/Button";
const PayButton = ({cartItems}) => {
    const {state, dispatch} = useContext(UserContext);
    const handleCheckout = async() => {
      const userId = state[1]._id;
      const res = await fetch("/create-checkout-session", {
       method: "POST",
       headers: {
           "Content-Type" : "application/json"
       },
       body: JSON.stringify({
           cartItems, userId
       })
      }) ;
      const data = await res.json();
           if( data.status === 400 || !data){
               window.alert(data.message)
           }
           else{
            window.location.href = data.url
           }
   }

  return (
    <Button style={{marginBottom: "2rem"}} onClick={() => handleCheckout()}>Continue to checkout...</Button>
    )
}

export default PayButton