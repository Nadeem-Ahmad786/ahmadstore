import React, {useContext} from 'react'
import { useParams, Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { UserContext } from './App';
import { Button } from "./styles/Button";
import {FiEdit3} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";
import {getLocalStorage, setLocalStorage} from "./helper/localstorage"

const SingleProduct = () => {
  const navigate = useNavigate();
  const {id} = useParams();
 const singleProductData = useLocation();
 const product_id = singleProductData.state.product_id;
  // console.log(data.state.description);
  const {state, dispatch} = useContext(UserContext);
  const PostData = async(e) =>{
    e.preventDefault();
    const user_id = getLocalStorage("user")._id;
    const res = await fetch("/cart", {
     method: "POST",
     headers: {
         "Content-Type" : "application/json"
     },
     body: JSON.stringify({
         user_id, product_id
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
 const PostDeleteData = async(e) =>{
  const productName = id;
  e.preventDefault();
  const product_id = singleProductData.state.product_id;
  const res = await fetch("/deleteproduct", {
   method: "DELETE",
   headers: {
       "Content-Type" : "application/json"
   },
   body: JSON.stringify({
       product_id , productName
   })
  }) ;
  const data = await res.json();
       if( data.status === 400 || !data){
           window.alert(data.message)
       }
       else{
          window.alert(data.message);
          navigate("/products");
       }
}
console.log(singleProductData.state);
  return (
    <div className='main_div'>
    <div className="container">
    <div className="sub_con">
    { getLocalStorage("user")!==null && getLocalStorage("user").role ==="admin" &&<div>
      <form>
      <MdDeleteOutline className="icon" onClick={PostDeleteData}/>
      </form>
      <Link className="card__title" to={"/editproduct/" + id} state= {{description: singleProductData.state.description, product_id: product_id, product_img: singleProductData.state.product_img, price: singleProductData.state.price, features: singleProductData.state.features, colors: singleProductData.state.colors}}><FiEdit3 className="icon" /></Link>
      </div>}
      <img className="single_img" src={singleProductData.state.product_img} alt={id}/>
      <h2>{id}</h2>
      <h3>{singleProductData.state.description}</h3> 
      <form method="post">
      <Button onClick={PostData}>Add to Cart</Button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default SingleProduct;