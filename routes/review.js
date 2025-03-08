const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listing.js");
const Review = require("../Models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const {reviewAuthor} = require("../middleware.js");
const review = require("../controllers/review.js");
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error)
    if(error)
    {
     let errMsg = error.details.map((el)=>el.message).join(",");
     throw new ExpressError(400,errMsg);
    }
    else{
     next();
    }
 }

 // app.get("/testListing",async (req,res)=>{
 //     let samplelisting = new Listing({
 //         title : "new Diamond Villa",
 //         description : "By the beach of river",
 //         price : 7200,
        
 //         location : "",
 //         country : "India"
 //     });
 //     await samplelisting.save();
 //     console.log("sample was saved");
 //     res.send("sucessfull testing");
 // })
 
 
 router.post("/",validateReview, wrapAsync(review.createReview
 ));
 router.delete("/:reviewId",reviewAuthor,wrapAsync(
     review.deleteReview
 ))
 module.exports = router;