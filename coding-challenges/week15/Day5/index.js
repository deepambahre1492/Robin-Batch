const express = require("express");
const app = express();
const morgan = require('morgan');

const upload = require('./multer');
const cloudinary = require('./cloudinary');
const fs = require('fs')

app.set('view engine', 'hbs')


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.get('/', (req,res)=> {
    console.log('hello')
    res.render("./index.hbs", { root: __dirname})
})


app.post('/singlefileupload', upload.array('image', 1), async(req,res)=>{
    const uploader = async(path) => await cloudinary.uploads(path, 'Images')
    if (req.method === 'POST'){
        const urls = []
        const files = req.files
        for (const file of files){
            const { path } = file

            const newPath = await uploader(path)

            urls.push(newPath)
            fs.unlinkSync(path)
        }
         res.status(200).json({
             message: 'Images Uploaded Successfully',
             data: urls
         })
    }else {
        res.status(405).json({
            err:"file_NOT_upoaded_successfully"
        })
    }   
})

app.post('/multiplefileupload', upload.array('image', 5), async(req,res)=>{
    const uploader = async(path) => await cloudinary.uploads(path, 'Images')
    if (req.method === 'POST'){
        const urls = []
        const files = req.files
        for (const file of files){
            const { path } = file

            const newPath = await uploader(path)

            urls.push(newPath)
            fs.unlinkSync(path)
        }
         res.status(200).json({
             message: 'Images Uploaded Successfully',
             data: urls
         })
    }else {
        res.status(405).json({
            err:"file_NOT_upoaded_successfully"
        })
    }   
})

app.listen('5000', ()=> console.log('please listen to port 5000'))