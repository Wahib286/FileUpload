const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


const fileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middlewere
fileSchema.post("save",async function(doc){
    try{
       console.log("DOC :",doc);

       //
       let transporter = nodemailer.createTransport({
        host : process.env.MAIL_HOST,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
       });

       //send mail
       console.log(doc.email);
       let info = await transporter.sendMail({
        from:`Wahib Bashar`,
        to: doc.email,
        subject: " New file has been successfully uploaded",
        html:`<h2> Hello Jee Ki Haal An</h2> <p> File Uploaded</p>`,
       })

       console.log(info);
    }
    catch(err){
        console.error(err)
    }
})

module.exports = mongoose.model("File", fileSchema);
