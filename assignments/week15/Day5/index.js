const express = require("express");
const morgan = require('morgan');
const multer = require('multer');
const app = express();
const hbs = require("hbs")

app.set('view engine', 'hbs')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file , cb){
        cb(null ,Date.now() + file.originalname)
    }
});

// const upload = multer({dest: 'uploads/'})
const upload = multer({storage: storage})


app .use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res)=> {
    console.log('hello')
    res.render("./index.hbs", { root: __dirname})
})

app.post('/upload', upload.array('image'), (req,res)=>{
    console.log(req.files);
    res.send("file_upoaded_successfully")
})

app.post('/upload2', upload.array('image'), (req,res)=>{
    console.log(req.files);
    res.send("file_upoaded_successfully")
})

app.listen('3000', ()=> console.log('please listen to port 3000'))