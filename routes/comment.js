var express =require("express");
var router =express.Router({mergeParams:true});
var Campground =require("../models/campground");
var Comment =require("../models/comment");
var middleware = require("../middleware");


//==========================
// COMMENT ROUTES
//==========================

router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground}); 
        }
    });
    
});

router.post("/", middleware.isLoggedIn, function(req, res){
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err || !comment){
                    req.flash("error", err.message);
                    res.redirect("campgrounds");
                }else{
                    //add username and id to comment
                    comment.author.id =req.user._id;
                    comment.author.username =req.user.username;  
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment Added");
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
        }
    });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            req.flash("error", "Comment Updated");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});


module.exports =router;