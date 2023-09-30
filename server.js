//check  if runnning on devmode
if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

//setup method override
const methodOverride = require("method-override");

//get express and layputs
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

//import bodyparser
const bodyParser = require("body-parser");

//setup path
const path = require("path");

//import modules/routes
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

//create app
const app = express();

//assign app settings
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

//tell app to use layouts and public folder for certain resources
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
//tell app to use bodyparser urlencoded because we are sending values via url to our server
app.use(bodyParser.urlencoded({limit: "10mb", extended: false}));
//tell app to use methodOverride by passing in the parameter of _method
app.use(methodOverride("_method"));

//import and setup mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true});

//log if we are connected to the database by accessing our connection with db
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));


//tell app to use the setup routes
app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

//tell app to listen on a specific port
app.listen(process.env.PORT || 3000, () =>{
    console.log("Server Listening on port 3000")
});

//test