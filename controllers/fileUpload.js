const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req,res)=>{
    try{
        //fetch file
        const file = req.files.file;
        console.log(file);

        //path to store on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(path)
        file.mv(path, (err)=>{
            console.log(err);
        });

        res.status(200).json({
            success:true,
            message:"Local file successfully Uploaded"
        })

    }catch(error){
        console.log("not ablle to upload file on server")
        console.log(error);
    }
}
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uuploadFileToCloudinary(file, folder){
    await cloudinary.uploader.upload(file.tempFilePath)
}
exports.imageUpload = async (req,res)=>{
    //data fetch
    const {name, tags, email} = req.body;

    const file = req.files.imageFile;

    //validation
    const supportedTypes = ["jpeg", "png", "jpg"];
    const fileTypes = file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileTypes, supportedTypes)){
        res.status(400).json({
            success:false,
            message:"file type not supported"
        })
    }

    //file format supported 

}