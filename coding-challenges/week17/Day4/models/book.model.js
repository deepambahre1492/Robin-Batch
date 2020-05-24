const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    BookName: String,
    BookAuthor: String,
    Genre: String,
    PublishedYear: Number,
    Rating: Number
},

{
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);