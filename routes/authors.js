//importing and setting up express and express router
const express = require("express");
const router = express.Router();

//importing author schema
const Author = require("../models/author")
const Book = require("../models/book")


//getting all of the authors
router.get("/", async (req, res) => {

    let searchOptions = {};

    if(req.query.name != null && req.query.name !== " "){
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
        res.redirect (`authors/${newAuthor.id}`);
        console.log("successful redirect");
    } catch {
        res.render("authors/new", {
          author: author,
          errorMessage: "Error creating Author"
        })
    }
})

//show user
router.get("/:id", async (req, res) => {

    try{
        const author = await Author.findById(req.params.id);
        const books = await Book.find({author: author.id}).limit(6).exec();
        res.render("authors/show", {
            author: author,
            booksByAuthor: books,
        })
    } catch(err) {
        console.log(err)
        res.redirect("/");
    }

})

//edit route
router.get("/:id/edit", async (req, res) => {

    try{
        const author = await Author.findById(req.params.id);
        res.render("authors/edit", { author: author });
    } catch{
        res.redirect("/authors");
    }
})

//update route
router.put("/:id", async (req, res) => {

    let author;

    try {
        author = await Author.findById(req.params.id);
        author.name = req.body.name;
        await author.save();
        res.redirect (`/authors/${author.id}`);
        console.log("successful redirect");
    } catch {
        if(author == null){
            res.redirect("/");
        }else{
            res.render("authors/edit", {
              author: author,
              errorMessage: "Error updating Author",
            });
        }    
    }
})

//delete route
router.delete("/:id", async (req, res) => {
    let author;

    try {
        author = await Author.findById(req.params.id);
        await Author.deleteOne({_id: req.params.id});
        res.redirect("/authors");
    } catch(err) {
        if(author == null){
            res.redirect("/");
        }else{
            console.error(err)
            res.redirect(`/authors/${req.params.id}`);
        }    
    }
})



module.exports = router;
