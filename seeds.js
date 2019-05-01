var mongoose =require("mongoose");
var Campground =require("./models/campground");
var Comment =require("./models/comment");

var data = [
        { 
            name: "Cloud's Rest",
            image: "http://media.newyorkupstate.com/photo-gallery/photo/2015/05/14/17793288-standard.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        { 
            name: "Desert Mesa",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ChPKhTimbGKUfdQiLnstG6c6RN21enPX2y75rAY9jK8FZnQOVw",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        { 
            name: "New Zealand Campsite",
            image: "https://tul.imgix.net/content/article/most-beautiful-camping-spots-new-zealand.jpg?auto=format,compress&w=740&h=486&fit=crop",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];
//remove all campgrounds
function seedDB(){
    Campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("campgrounds removed");
    
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             console.log("Campground created");
    //             //create a comment
    //             Comment.create(
    //                 {
    //                     text: "The place is great, but I wish there was internet",
    //                     author: "Homer"
                    
    //             },function(err,comment){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("comment added");
    //                 }
    //             });
    //         }
    //     });
    // });
    });
}
module.exports = seedDB;


