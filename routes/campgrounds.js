var express =require("express");
var router =express.Router();
var Campground =require("../models/campground");
var Comment =require("../models/comment");
var middleware =require("../middleware");


//INDEX
router.get("/",function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
             res.render("campgrounds/index",{campgrounds:allCampgrounds, page:"campgrounds"});  
        }
    });
});

//NEW- show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW- shows more info about the campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price =req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, price:price, image:image, description:desc, author:author};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
            req.flash("error", err.message);
        }else{
            req.flash("success", "New Campground created");
            res.redirect("/campgrounds");
        }
    });
});

//EDIT ROUTE 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){   
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});    

//UPDATE ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground Updated");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
        if(err){
            res.redirect("/campgrounds");
        }else{
           Comment.deleteMany({_id: { $in: campgroundRemoved.comments }}, function(err){
               if(err){
                   req.flash("error", err.message);
                   res.redirect("/campgrounds");
               }else{
                   req.flash("success", "Campground Deleted");
                   res.redirect("/campgrounds");
               }
           });
        }
    });
});



module.exports = router;
