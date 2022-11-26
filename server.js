const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/eCommerceDB", {useNewUrlParser: true});
const bcrypt = require("bcryptjs");
const User = require("./models/register");
const Product = require("./models/products");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51LyZLTSAg8sVCfXryjhbbAK14Sg4NfYw5x7eihaaOgQSMDQyLA5BojSEoE75hXqUhiy6axIkvYe6jpFooATJsQqo00YyWEMN1N");
const authAdmin = require("./middleware/authAdmin");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.post("/registerUser", async(req, res) => {
    const {name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(400).send({message: "Please Enter all the Feilds"});
    }

    const userExits = await User.findOne({ email });
    if(!userExits){
        const user =new User({
            role: "basic",
            name: name,
            email: email,
            password: password,
            address: ""
        });                                                                    
        const token = await user.generateToken();  
        console.log(token);                                                                                       
        user.save();
        res.status(200).send({message: "User Registed"});

    }
    else{
        res.status(400).send({message: "user already exists"});
    }
});

app.post("/loginUser", async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const passwordMatchStatus = await bcrypt.compare(password, user.password);
        if(passwordMatchStatus){

            const token = await user.generateToken(); 
            res.cookie("NAEcommercetoken", token,{
                expire: new Date(Date.now + 864000000),
                httpOnly: true
            });
            //res.send(req.cookies.NAEcommercetoken);
            res.status(201).send({message: "Login Successfully", userData: user});

        }
        else{
            res.status(400).send({message: "password is incorrect!"});
        }
    }
    else{
        res.status(404).send("User not found");
    }
});

app.get("/logout", auth, async(req, res) =>{
    try{
        //for single logout
        req.user.tokens = req.user.tokens.filter((currentElement) => {
            return currentElement.token != req.token;
         })
        // logout from all devices
        // req.user.tokens =[];
        res.clearCookie("NAEcommercetoken");
        console.log("logout succesfully");
        await req.user.save();
         res.status(200).send("user logout")
    }
    catch (error) {
        res.status(500).send({error});
    }
});


app.get("/cart",auth, async function(req, res){
//     const {user_id} =req.body;
//     const cartProducts = []
//     const user = await User.findOne({_id:user_id});
//     //console.log(user);
//         if(!(user==undefined || user == null)){
//             const cartProducts =  user.cart.map(async(cartItem) =>{
//            await Product.findOne({_id:cartItem.productid}, function(err, product){
//                 if(!err){
//                     const item = {
//                         productId: cartItem.productid,
//                         productName: product.productName,
//                         productImage: product.productImage,
//                         productPrice: product.productPrice,
//                         quantity: cartItem.quantity,
//                     }
//                     return item;
//                 }
//                 });
//             });
//             res.send(cartProducts);
//         }

//    // res.send(cartProducts);
    const user_id =req.user._id;
    const cartProducts = [];
    //find user by ID
    const user = await User.findById(user_id);
    //means user not found
    if(!user){
        res.send("User is not registered")
        return ;
    }
    for( const cartItem of user.cart) {
        const product = await Product.findById(cartItem.productid);
        const item = {
            productId: cartItem.productid,
            productName: product.productName,
            productImage: product.productImage,
            productPrice: product.productPrice,
            quantity: cartItem.quantity,
            }
            cartProducts.push(item);
    }
//    console.log(cartProducts);
    res.send(cartProducts);
});

app.post("/cart", auth, async function(req, res){
    let {user_id, product_id, quantity} = req.body;
    // console.log(req.body);
    // console.log(user_id);
    // console.log(product_id);
    if(quantity>=1){
        const user = await User.findOne({_id: user_id}).select({ cart: {$elemMatch: {productid: product_id}}});
        user.cart[0].quantity = quantity;
        await user.save();
        const updatedata = await User.findOne({_id: user_id});
        res.status(201).send({message: "quantity is changed", userData: updatedata});
        return ;
    }
    if(quantity==undefined){
        const user = await User.findOne({_id: user_id}).select({ cart: {$elemMatch: {productid: product_id}}});
        if(user.cart.length ===1){
            user.cart[0].quantity += 1;
            await user.save();
            const updatedata = await User.findOne({_id: user_id});
            res.status(201).send({message: "quantity is changed", userData: updatedata});
            return ;
        }
        quantity= 1;
  //      User.update({_id: user_id}, {$push: {cart: {productid: product_id, quantity: quantity}}});

        await User.findOneAndUpdate({_id:user_id},{$push: {cart: {productid: product_id, quantity: quantity}}});
        const updatedata = await User.findOne({_id: user_id});
        res.status(201).send({message: "product added succesfully", userData: updatedata});
        return ;
    }
    if(quantity==0){
        const user =await User.findById(user_id);
            if(!user){
                window.alert("User not found");
                res.status(400).send({message: "User not found", userData: null});
                return ;
            }
            user.cart = user.cart.filter((currentProduct) => {
                    return currentProduct.productid != product_id;
            });
           // console.log(user.cart);
            await user.save();
            res.status(201).send({message:"product remove successfully", userData: user});
            return ;
    
        // User.findOneAndUpdate({_id:user_id},{$pull: {cart: {productid: product_id}}}, function(err, foundUser){
        //     if(!err)
        //         console.log(foundUser);
        // });
       // res.status(201).send({message: "product delete succesfully"});
       // return ;
        
    }
    
});

app.get("/products/all", async(req, res) => {
    const products = await Product.find({});
       res.status(200).send(products);
});

app.post("/addproduct", auth,authAdmin("admin"), async(req, res) =>{ 
    
    const {productName, description, imgUrl, price, features, colors} = req.body;
    const newProduct = new Product({
        productName: productName,
        productDescription: description,
        productImage: imgUrl,
        productPrice: Number(price),
        productFeatures : features,
        productColors: colors
    });
    await newProduct.save();
    res.status(200).send({message: "Product added successfully!"});
});
app.delete("/deleteproduct", auth, authAdmin("admin"), async(req, res) => {
    const {product_id, productName} = req.body;
    Product.deleteOne({_id: product_id}, function(err){
        if(!err) res.send({message: "successfully deleted" + productName});
        else res.send({message:err});
      });
});
app.post("/editproduct", auth, authAdmin("admin"), async(req, res) =>{ 
    
    const {productId, productName, description, imgUrl, price, features, colors} = req.body;
    await Product.findByIdAndUpdate({_id: productId},{
        productName: productName,
        productDescription: description,
        productImage: imgUrl,
        productPrice: Number(price),
        productFeatures : features,
        productColors: colors,})
    res.status(200).send({message: "Product edited successfully!"});
});
app.post("/saveAddress", auth, async(req, res) =>{
    const {user_id, address} = req.body;
    await User.findByIdAndUpdate({_id: user_id}, {address: address});
    res.send({message:"Address Changed"});
});

const YOUR_DOMAIN = 'http://localhost:3000';
app.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.cartItems.map((item) => {
        return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.productName,
                        images: [item.productImage],
                        description: item.productDescription,
                        metadata:{
                            id: item.productId
                        }
                    },
                    unit_amount: item.productPrice *100,
                },
                quantity: item.quantity,
            };
    });

    const session = await stripe.checkout.sessions.create({    
      line_items,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/checkout-success`,
      cancel_url: `${YOUR_DOMAIN}/cart`,
    });
  
    res.send({url: session.url});
  });


app.listen(5000, function(){
    console.log("Server Started");
})
