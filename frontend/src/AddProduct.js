import React, { useEffect, useState } from 'react'
import {useNavigate}  from "react-router-dom";

const AddProduct = () => {

    const navigate = useNavigate();

    const [features, setFeatures] = useState([]);
    const [feature, setFeature] = useState("");
   
    function handlefeatureChange(e){
        setFeature(e.target.value);
    }
    function handlefeaturesChange(){
        let arr = features;
        setFeature('');
        arr.push(feature);
        setFeatures(arr);
    }
   
    const [colors, setColors] = useState([]);
    const [color, setColor] = useState("");
   
    function handlecolorChange(e){
        setColor(e.target.value);
    }
    function handlecolorsChange(){
        let arr = colors;
        setColor('');
        arr.push(color);
        setColors(arr);
    }
    const [productDetail, setProduct] = useState({
        productName: "", description: "", imgUrl: "", price: 0
    });
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setProduct({...productDetail, [name]: value});
    }

    //post data
    const PostData = async(e) =>{
        e.preventDefault();
        const {productName, description, imgUrl, price} = productDetail;
        const res = await fetch("/addproduct", {
         method: "POST",
         headers: {
             "Content-Type" : "application/json"
         },
         body: JSON.stringify({
            productName, description, imgUrl, price, features, colors
         })
        }) ;
        const data = await res.json();
             if( data.status === 400 || !data){
                 window.alert(data.message)
             }
             else{
                // dispatch({type:"USER", payload:[true, data.userData]})
                // console.log(state);
                 window.alert(data.message);
                 navigate("/products");
             }
     }
  return (

    <div className='main1 text-center h-auto'>
    <main className="form-signin w-100 m-auto">
        <form method="post">
            <img className="mb-4" src="images\logo2.svg" alt="my-logo" />

            <h1 className="h3 mb-3 fw-normal">Add Your Product</h1>
            <div className="form-floating">
                <input type="text" name="productName" onChange={handleInput} className="form-control product" id="floatingInput" placeholder="name" />
                <label for="floatingInput">Product Name</label>
            </div>
            <div className="form-floating">
                <input type="text" name="description" onChange={handleInput} className="form-control  product" id="floatingPassword" placeholder="description" />
                <label for="floatingInput">description</label>
            </div>
            <div className="form-floating">
                <input type="url" name="imgUrl" onChange={handleInput} className="form-control  product" id="floatingPassword" placeholder="https://example.com" />
                <label for="floatingInput">Image Url</label>
            </div>
            <div className="form-floating">
                <input type="number" name="price" onChange={handleInput} className="form-control  product" id="floatingPassword" placeholder="Price" />
                <label for="floatingInput">Price</label>
            </div>
            
             {features.map(newfeature => <ul key={newfeature}><li>{newfeature}</li></ul>)}
            <div className="form-floating">
                <input type="text" name="feature" onChange={handlefeatureChange} className="form-control product" id="floatingPassword" placeholder="features" value={feature}/>
                <label for="floatingInput">Features</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary product"  type="button" onClick={handlefeaturesChange}>Add more features</button>
            
            {colors.map(newcolor => <ul key={newcolor}><li>{newcolor}</li></ul>)}
            <div className="form-floating">
                <input type="text" name="color" onChange={handlecolorChange} className="form-control product" id="floatingPassword" placeholder="Colors" value={color}/>
                <label for="floatingInput">Colors</label>
            </div> 
            <button className="w-100 btn btn-lg btn-primary  product"  type="button" onClick={handlecolorsChange}>Add more Colors</button>
            <button className="w-100 btn btn-lg btn-primary  product" type="submit" onClick={PostData} >Add Product</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2022 - Nadeem Ahmad </p>
        </form>
        </main>
    </div>
  )
}

export default AddProduct
























