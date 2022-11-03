import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
// import { Button } from "./styles/Button";
import { UserContext } from './App';

const Logout = () => {

    const {state, dispatch} = useContext(UserContext);
   //promises - newcode

   const navigate = useNavigate();

   useEffect(() => {
    fetch("/logout", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        credentials: "include"
    }).then((res) => {
        dispatch({type:"USER", payload:[false, null]})
        console.log(state);
        navigate("/login");
        if( res.status !== 200 || !res){
            window.alert(res.error)
        }
    }).catch((err) =>{
        console.log(err);
    })
   })


//  const inlineCss ={
//         height: "90vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         paddingTop: "20rem",
//         paddingBottom: "40px",
//         backgroundImage: "linear-gradient(to right,#C7F02A,#5CB8E4)"
//  }
//   return (
//     <div style={inlineCss}>
//         <h1>Do you Wish to Logout?</h1>
//         <div style={{marginTop: "10rem"}}>
//         <NavLink>
//         <Button>Logout from this device</Button>
//         </NavLink>
//         <NavLink>
//         <Button>Logout from all devices</Button>
//         </NavLink>
//         </div>
//     </div>
//   )
}

export default Logout