var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash =require("connect-flash");
var methodOverride =require("method-override");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport =require("passport");
var LocalStrategy =require("passport-local");
var User =require("./models/user");

var campgroundRoutes =require("./routes/campgrounds");
var commentRoutes =require("./routes/comment");
var indexRoutes =require("./routes/index");

//seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v12");  
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());  //line before passport config
app.locals.moment = require('moment');  //line before passport config

//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"ffdsdsffdfsdfdsdsffdsdfsfghhdhthCASAD",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser =req.user;
    res.locals.error =req.flash("error");
    res.locals.success =req.flash("success");
    next();
})

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server Started");
});