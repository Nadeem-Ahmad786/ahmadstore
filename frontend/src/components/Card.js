import React,{ useContext} from "react";
import {useNavigate,Link} from 'react-router-dom';
import {getLocalStorage} from "../helper/localstorage"
import {setLocalStorage} from "../helper/localstorage"
import { UserContext } from '../App';
const Card = (props) => {

  const {state, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const PostData = async(e) =>{
    e.preventDefault();
    if(getLocalStorage("user")){
      const user_id = getLocalStorage("user")._id;
      const product_id = props.product_id;
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
            console.log(data);
              dispatch({type:"USER", payload:[true, data.userData]})
              console.log(data.userData)
              setLocalStorage("user", data.userData);
              window.alert(data.message);
          }
    }
    else{
      navigate("/login");
    }
 }
    return (
      <div className="card">
        <img src={props.img} className="card__img" />
        <div className="card__body">
        <p className="card__title">
          <Link className="card__title" to={"/singleproduct/" + props.title} state= {{description: props.description, product_id: props.product_id, product_img: props.img, price: props.price, features: props.features, colors: props.colors}}>{props.title}</Link>
        </p>
          <p className="card__description">{props.description}</p>
          <h3 className="card__price">{props.price}</h3>
          <form method="post">
          <button className="card__btn" onClick={PostData}>Add to Cart</button>
          </form>
        </div>
      </div>
    );
  }

export default Card; 
