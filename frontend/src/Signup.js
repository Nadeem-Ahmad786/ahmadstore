import React, {useState} from "react";
import {useNavigate}  from "react-router-dom";
const Signup =() =>{

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", password: ""
    });
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value});
    } 
    const PostData = async(e) =>{
       e.preventDefault();
       const {name, email, password} = user;
       const res = await fetch("/registerUser", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            name, email, password
        })
       }) ;
       const data = await res.json();
       if(res.status ===400){
            window.alert(data.message);
            navigate("/signup");
        }
        else{
             window.alert(data.message);
            navigate("/login");
        }
    }
    return (
        <div className=" main1 text-center">
        <div className="form-signin w-100 m-auto">
            <form method="post">
                <img className="mb-4" src="images/logo2.svg" alt="my-logo" />
                <h1 className="h3 mb-3 fw-normal">Register</h1>
                <div class="form-floating">
                    <input type="name" onChange={handleInput} name="name" className="form-control" id="floatingInput" placeholder="Name" />
                    <label for="floatingInput">Enter Your Name</label>
                </div>
                <div className="form-floating">
                <input type="email" name="email" onChange={handleInput} class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                <input type="password" name="password" onChange={handleInput} class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={PostData}>Register</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2022 - Nadeem Ahmad </p>
            </form>
        </div>
        </div>
    )

}
export default Signup;