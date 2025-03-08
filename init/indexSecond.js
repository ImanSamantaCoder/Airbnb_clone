const mongoose = require("mongoose");
const Listingdata = require("./data.js");
const Listing = require("../Models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlustProject";
main().then(()=>{console.log("connected to db");}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const initDB = async ()=>{
   await Listing.deleteMany({});
   Listingdata.data = Listingdata.data.map((obj)=>({...obj,owner:"679e73d47777be87205d4181"}))
   await Listing.insertMany(Listingdata.data);
   console.log("data was initialized");
}
initDB();