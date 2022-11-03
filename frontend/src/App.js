import React, { createContext, useReducer  } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Contact from "./Contact";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import ErrorPage from './ErrorPage'
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout"
import {initialState, reducer} from "../src/reducer/UseReducer"
import AddProduct from "./AddProduct";
import Checkout from "./Checkout";
import EditProduct from "./EditProduct";
import CheckoutSuccess from "./components/CheckoutSuccess";

 export const UserContext = createContext();
const App = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const theme = {
        colors:{
            heading: "rgb(24, 24, 29)",
            text: "rgba(29, 29, 29, .8)",
            white: "#fff",
            black: "#212529",
            helper: "#8490ff",

            bg: "#F6F8FA",
            footer_bg: "#0a1435",
            btn: "rgb(98, 84, 243)",
            border: "rgba(98, 84, 243, 0.5)",
            hr: "#ffffff",
            gradient: "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
            shadow:  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
            shadowsunport: "rgba(0, 0,0, 0.16) 0px 1px 4px",
        },
        media: {
            mobile: "768px",
            tab: "998px",
        },
    };
    
    return (

        <UserContext.Provider value={{ state, dispatch}}>
        <ThemeProvider theme={theme}>
            <Router>
                <GlobalStyle/>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="addproduct" element = {<AddProduct />}/>
                    <Route path="/products" element={<Products />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/singleproduct/:id" element={<SingleProduct />} />
                    <Route path="/editproduct/:id" element={<EditProduct />} />
                    <Route path="/cart" element={<Cart />}/>
                    <Route path="/checkout-success" element={<CheckoutSuccess />}/>
                    <Route path="/checkout" element={<Checkout />}/>
                    {/* <Route path="/payment"/> */}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
        </UserContext.Provider>
    );
}
export default App;