//importing and setting up express and express router
const express = require("express");
const router = express.Router();

//importing author and book schema
const Author = require("../models/author");
const Book = require("../models/book");

//getting all books route
router.get("/", async (req, res) => {
    res.send("All books");
});

//getting new book route
router.get("/new", async (req, res) => {
    try{
        const authors = await Author.find({});
        const book = new Book();
        res.render("books/new", {
            authors: authors,
            book: book,
        })
    } catch{
        res.redirect("/books");
    };
});

//creating new book route
router.post("/", async (req, res) => {
    res.send("Create Book");
});

module.exports = router;
