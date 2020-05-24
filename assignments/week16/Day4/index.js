const express = require("express");
const bodyParser = require("body-parser");
const student = require("./routes/student");


const app = express();

// PORT
//const PORT = process.env.PORT || 4000;

const mongoose = require('mongoose')
const dbConfig = require ('./config/db')
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.MongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /student/*
 * Method - *
 */
app.use("/", student);
// listen for requests
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

