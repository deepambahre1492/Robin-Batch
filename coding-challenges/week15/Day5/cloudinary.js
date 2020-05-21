var cloudinary = require('cloudinary');
const dotenv = require('dotenv')


dotenv.config()


cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET 
  })

exports.uploads = (file, folder)=>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result)=>{
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resourse_type: "auto",
            folder: folder
        })
    })
}
