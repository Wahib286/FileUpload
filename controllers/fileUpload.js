const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;
    console.log(file);

    //path to store on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log(path);
    file.mv(path, (err) => {
      console.log(err);
    });

    res.status(200).json({
      success: true,
      message: "Local file successfully Uploaded",
    });
  } catch (error) {
    console.log("not ablle to upload file on server");
    console.log(error);
  }
};
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,) {
  const options = {
    folder,
    resource_type: "auto",
    transformation: [
      {
        quality: "auto:low",   // <--- This lowers file size the smart way
      }
    ]
  };

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name,tags,email);

    const file = req.files.imageFile;
    console.log("Fille is :", file);

    //validation
    const supportedTypes = ["jpeg", "png", "jpg"];
    const fileTypes = file.name.split(".")[1].toLowerCase();
  

    if (!isFileTypeSupported(fileTypes, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file type not supported",
      });
    }

    //file format supported
    const response = await uploadFileToCloudinary(file, "WahibDBimages");

    //db me entry save karne ki 
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url,
    })

    //response
    res.status(200).json({
      success: true,
      imageUrl:response.secure_url,
      message: "Image file successfully Uploaded",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

//Video upload handler
exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;

    const file = req.files.videoFile;
    console.log(file);

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileTypes = file.name.split(".")[1].toLowerCase();
  

    if (!isFileTypeSupported(fileTypes, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file type not supported",
      });
    }

    //file format supported
    const response = await uploadFileToCloudinary(file, "WahibDBimages");
    console.log(response);

    //db me entry save karne ki 
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url,
    })

    res.status(200).json({
      success: true,
      imageUrl:response.secure_url,
      message: "video file successfully Uploaded",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

//image size reduce
exports.reducedimageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name,tags,email);

    const file = req.files.imageFile;
    console.log("Fille is :", file);

    //validation
    const supportedTypes = ["jpeg", "png", "jpg"];
    const fileTypes = file.name.split(".")[1].toLowerCase();
  

    if (!isFileTypeSupported(fileTypes, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file type not supported",
      });
    }

    //file format supported
    const response = await uploadFileToCloudinary(file, "WahibDBimages", 10);

    //db me entry save karne ki 
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url,
    })

    res.status(200).json({
      success: true,
      imageUrl:response.secure_url,
      message: "Image file successfully Uploaded",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};