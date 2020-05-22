var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    Name: {
        type: String
    },
    Username: {
        type: String,
        unique: true
    },
    Email:  {
        type: String
    },
    Password:  {
        type: String
    }
});

var user = new mongoose.model('User', schema);

module.exports = user;
