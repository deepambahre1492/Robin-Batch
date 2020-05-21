require('./models/db');

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
 
const tennis = require('./controllers/tennis');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
//app.set('views', path.join(__dirname, '/views/'));
// SET THE DIRECTORY USED TO SERVE VIEWS
app.set("views", __dirname + "/views");
// SET THE STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(__dirname + "/public"));

app.engine('hbs', exphbs({ handlebars: allowInsecurePrototypeAccess(Handlebars),extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.get('/', (req, res) => {
    res.render("player/crud", {
        viewTitle: "Insert PLAYER"
    });
});

app.use('/player', tennis);