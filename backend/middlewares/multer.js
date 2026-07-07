import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // This folder will auto-create or you can create an empty 'uploads' folder in your root directory
        callback(null, 'uploads/') 
    },
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({ storage })

export default upload

