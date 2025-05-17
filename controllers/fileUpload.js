const File = require("../models/File");

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