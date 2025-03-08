const Review = require("./Models/review");
module.exports.saves = (req,res,next)=>{
    req.session.redirectUrl = req.originalUrl;
    console.log(req.originalUrl);
    next();
}
module.exports.saveRedirectUrl = (req,res,next)=>{
    
    if(req.session.redirectUrl)
    {
        console.log(req.session.redirectUrl);
        res.locals.redirectUrl = req.session.redirectUrl;
    }
   next();
}
module.exports.reviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id))
    {
        req.flash("error","you are not owner of this listing");
        return res.redirect(`/listings/${id}`)
    }
    next()

}