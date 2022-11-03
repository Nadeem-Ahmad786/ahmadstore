const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/eCommerceDB", {useNewUrlParser: true});
const bcrypt = require("bcryptjs");const User = require("./register");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const app = express();
const User = require("./userModel");