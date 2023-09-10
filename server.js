//check  if runnning on devmode
if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

//get express and layputs
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

//import modules/routes
const indexRouter = require("./routes/index");

//create app
const app = express();

//assign app settings
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

//tell app to use layouts and public folder for certain resources
app.use(expressLayouts);
app.use(express.static("public"));

//import and setup mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);

//log if we are connected to the database by accessing our connection with db
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));


//tell app to use the setup route
app.use("/", indexRouter);

//tell app to listen on a specific port
app.listen(process.env.PORT || 3000, () =>{
    console.log("Server Listening on port 3000")
});