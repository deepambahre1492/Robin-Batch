const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()
const pass = process.env.pass
mongoose.connect('mongodb://127.0.0.1:27017/tennis-Player', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
    }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./player.model');
