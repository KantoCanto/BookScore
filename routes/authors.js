//importing and setting up express and express router
const express = require("express");
const router = express.Router();

//importing author schema
const Author = require("../models/author.js")


//getting all of the authors
router.get("/", async (req, res) => {

    let searchOptions = {};
    if (req.query.name != null && req.query.name !== " "){
        searchOptions.name = new RegExp(req.query.name, "i");
    }

    try{
        const authors = await Author.find(searchOptions);
        res.render("authors/index", { 
            authors: authors, 
            searchOptions: req.query
        });
    } catch{
        res.redirect("/");
    }
  
});



//getting and displaying new author 
router.get("/new", (req,res) => {
    res.render("authors/new", {author: new Author()});
})



//creating the author
router.post("/", async (req,res) => {

    const author = new Author({
        name: req.body.name
    });

    try {
      const newAuthor = await author.save();
      //res.redirect ("authors/${newAuthor.id}");
        console.log("successful redirect");
        res.redirect("authors");
    } catch {
        res.render("authors/new", {
          author: author,
          errorMessage: "Error creating Author"
        })
    }
})

module.exports = router;