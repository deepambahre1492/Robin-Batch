const multer = require('multer');

// specify the storage engine

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file , cb){
        cb(null, Date.now() + file.originalname)
    }
});

//file validation

const fileFilter = (req,file,cb)=> {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    else {
        //prevent to upload
        cb({message: 'Unsupported File Formate'},false )
    }
   
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 2024 * 2024 },
    fileFilter: fileFilter
})


module.exports = upload;