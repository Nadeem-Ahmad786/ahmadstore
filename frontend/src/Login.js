import React, {useContext, useState} from 'react'
import {useNavigate}  from "react-router-dom";

import { UserContext } from './App';
const Login = () => {

  const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "", password: ""
    });
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value});
    } 
    const PostData = async(e) =>{
       e.preventDefault();
       const {email, password} = user;
       const res = await fetch("/loginUser", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email, password
        })
       }) ;
       const data = await res.json();
            if( data.status === 400 || !data){
                window.alert(data.message)
            }
            else{
                dispatch({type:"USER", payload:[true, data.userData]})
                console.log(state);
                window.alert(data.message);
                navigate("/");
            }
    }
  return (
    <div className='main1 text-center height'>
    <main className="form-signin w-100 m-auto">
  <form method="post">
    <img className="mb-4" src="images\logo2.svg" alt="my-logo" />
    <h1 className="h3 mb-3 fw-normal">Please Login in</h1>

    <div className="form-floating">
      <input type="email" name="email" onChange={handleInput} className="form-control" id="floatingInput" placeholder="name@example.com" />
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" name="password" onChange={handleInput} className="form-control" id="floatingPassword" placeholder="Password" />
      <label for="floatingPassword">Password</label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={PostData} >Log in</button>
    <p className="mt-5 mb-3 text-muted">&copy; 2022 - Nadeem Ahmad </p>
  </form>
</main>
</div>
  )
}

export default Login