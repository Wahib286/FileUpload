//App Create
const express = require("express");
const app = express();

//Port find 
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//middlewere
app.use(express.json());

const fileupload = require("express-fileupload");
app.use(fileupload());

//dbconnect
require("./configs/database").dbconnect();

//cloud connect
const cloudinary = require("./configs/cloudinary");
cloudinary.cloudinaryConnect();

//Mount
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

app.listen(PORT, ()=>{
    console.log(`App is ruunning at ${PORT}`);
})