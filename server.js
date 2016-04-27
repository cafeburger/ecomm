var express = require('express');
var morgan = require("morgan");     // http request logger
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var mainRoutes = require("./routes/main");
var userRoutes = require("./routes/user");

var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("express-flash");

var User = require("./models/user")

var app = express();

mongoose.connect('mongodb://root:root1234@ds021711.mlab.com:21711/cafe_ecomm', function(err){
    if(err) {
        console.log(err);
    }
    else {
        console.log("Connected to the datbase!")
    }
    
})


// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret: "Sam1!@#23^4"
}));
app.use(flash());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(mainRoutes);
app.use(userRoutes);



// app.get("/", function(req, res){
//     var name = "Batman";
//     res.json("my name is " + name + "..");
    
// })

app.listen(process.env.PORT, function(err){
    if (err) throw err;
    console.log("Server is Running on port " + process.env.PORT);
    
})