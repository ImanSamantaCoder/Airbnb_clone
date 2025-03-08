const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");

const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../Models/listing.js");
const listingController = require("../controllers/listings.js");
const { save, saves } = require("../middleware.js");
const multer  = require("multer")
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

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
 //Index , post
 router.route("/").get(wrapAsync(listingController.index))
//  .post(wrapAsync(listingController.createNewListing));
.post(upload.single('listing[image]'),wrapAsync(listingController.createNewListing))
 //Index route
// router.get("/",wrapAsync(listingController.index));
//new route
router.get("/new",saves,listingController.renderNewForm)
//show route
router.get("/:id",wrapAsync(listingController.showListing));
//create Listing

// router.post("/",wrapAsync(listingController.createNewListing));
//get Listing Form
router.get("/:id/edit",wrapAsync(listingController.editListingForm));
//edit Listing delete listing
router.route("/:id").put(wrapAsync(listingController.editListing)).delete(wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log("deleted listing");
    res.redirect("/listings");
   }));
// router.put("/:id",wrapAsync(listingController.editListing));
// router.delete("/:id",wrapAsync(async (req,res)=>{
//  let {id} = req.params;
//  let deletedlisting = await Listing.findByIdAndDelete(id);
//  console.log("deleted listing");
//  res.redirect("/listings");
// }));
module.exports = router;