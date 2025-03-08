if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
    console.log(process.env.SECRET) // remove this after you've confirmed it is working
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlustProject";
const Listing = require("./Models/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./Models/review.js");
const { error } = require("console");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const passport=require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const sessionOptions = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly : true
    }
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
main().then(()=>{console.log("connected to db");}).catch(err => console.log(err));
app.use(flash());
async function main() {
  await mongoose.connect(MONGO_URL);
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.engine("ejs",ejsMate);
const port = 8080;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
})

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.currUser = req.user;
    console.log("curUser",res.locals.currUser);
    next();
})
app.use((req,res,next)=>{
    res.locals.error = req.flash("error");
    next();
})
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))
app.get("/",(req,res)=>{
    res.send("Hi I am Root");
})

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/auth",userRouter);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
app.get("/demouser",async (req,res)=>{
    let fakeuser = new User(
      {
           email : "student1236@gmail.com",
           username : "delta-students-iman"
      }
    );
    let registeredUser = await User.register(fakeuser,"helloworld");
    console.log(registeredUser);
    res.send(registeredUser);
})
// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page not found"));
// })
// app.use((err,req,res,next)=>{
//     let {statuscode=500,message} = err;
//     res.render("error.ejs",{err})
//     // res.status(statuscode).send(message);
// })