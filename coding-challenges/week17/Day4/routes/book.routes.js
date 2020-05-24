module.exports = (app) => {
    const books = require('../controllers/book.controller.js');
    const Book = require('../models/book.model.js');

    // Create a new Book
    app.post('/books', books.create);

    // Retrieve all Books
    app.get('/books', books.findAll);

    // Retrieve a single Book with bookId
    app.get('/books/:bookId', books.findOne);

    // Update a Book with bookId
    app.put('/books/:bookId', books.update);

    // Delete a Book with bookId
    app.delete('/books/:bookId', books.delete);

    //Filter Books based on same Author.
    app.post('/books/:BookAuthor', books.BooksByAuthor);

}





