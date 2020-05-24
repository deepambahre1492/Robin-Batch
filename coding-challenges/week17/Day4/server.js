const express = require('express');
const bodyParser = require('body-parser');
const hbs = require("hbs");
var path=require('path');

// create express app
const app = express();

// SET THE TEMPLATING ENGINE
app.set("view engine", "hbs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// SET THE DIRECTORY USED TO SERVE VIEWS
app.set("views", __dirname + "/views");

// SET THE STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(__dirname + "/public"));

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get("/", (req, res, next) => {
    res.render('index');
});


require('./routes/book.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});