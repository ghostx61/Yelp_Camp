var express =require("express");
var router =express.Router();
var passport =require("passport");
var User = require("../models/user");
var Campground =require("../models/campground");

router.get("/",function(req, res){
   res.render("landing"); 
});


//===============
//AUTH ROUTES
//================

router.get("/register",function(req,res){
    res.render("register", {page:"register"});
});

router.post("/register",function(req, res){
    var newUser =new User(
        {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar
        });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");  // OR   res.render("register", {"error": err.message})
        }else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Yelp Camp "+user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req, res){
    res.render("login", {page:"login"});
});

router.post("/login", passport.authenticate("local", 
{   
    successRedirect:"/campgrounds",
    successFlash: "Login Successful",
    failureRedirect:"/login"
    }) ,function(req, res){});

router.get("/logout",function(req, res){
    req.logout();
    req.flash("success", "Logout Successful");
    res.redirect("/campgrounds");
});


//USER PROFILE
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", "User not found");
            return res.redirect("/campgrounds");
        }
        Campground.find().where("author.id").equals(foundUser._id).exec(function(err, userCampgrounds){
            if(err){
                req.flash("error", "Something went wrong");
                return res.redirect("/campgrounds");
            }
            res.render("users/show.ejs", {user: foundUser, campgrounds: userCampgrounds}); 
        });
    });
});


module.exports =router;