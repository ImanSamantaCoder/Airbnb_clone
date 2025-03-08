const Listing = require("../Models/listing");
const Review = require("../Models/review");
module.exports.createReview = async (req,res)=>{
    const listing = await Listing.findById(req.params.id);
    console.log(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log("latest",newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new Review saved");
    res.redirect(`/listings/${listing._id}`);
}
module.exports.deleteReview = async (req,res)=>{
         let {id,reviewId} = req.params;
         await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}});
         await Review.findByIdAndDelete(reviewId);
         res.redirect(`/listings/${id}`);
     }