const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload, videoUpload, reducedimageUpload} = require("../controllers/fileUpload");

//Api route
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/reducedimageUpload",reducedimageUpload);


module.exports = router;