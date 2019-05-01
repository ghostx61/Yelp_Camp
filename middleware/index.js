var Campground =require("../models/campground");
var Comment =require("../models/comment");

//MIDDLEWARE

var middlewareObj ={};

middlewareObj.checkCampgroundOwnership= function checkCampgroundOwnership(req ,res, next){
    // is user logged in
   if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){   
            if(err || !foundCampground){
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            }else{
                //does user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next(); 
                }else{
                    res.redirect("back");
                }
            } 
        });
   }else{
       req.flash("error", "You need to be Logged In");
       res.redirect("back");
   }

}

middlewareObj.checkCommentOwnership= function checkCommentOwnership(req ,res, next){
    // is user logged in
   if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){   
            if(err || !foundComment){
                req.flash("error", "comment not found");
                res.redirect("/campgrounds");
            }else{
                //does user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next(); 
                }else{
                    res.redirect("back");
                }
            } 
        });
   }else{
       req.flash("error", "You need to be Logged In");
       res.redirect("back");
   }

}

middlewareObj.isLoggedIn= function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObj;

