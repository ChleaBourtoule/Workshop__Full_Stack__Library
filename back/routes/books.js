const booksRouter = require("express").Router();
const Book = require("../models/book");

booksRouter.get("/", (req, res) => {
  const { title } = req.query;
  Book.findBooks({ filters: { title } })
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving books from database");
    });
});

booksRouter.get("/:quote", (req, res) => {
  Book.findOneBook(req.params.quote)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).send("Book not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error retrieving the book from the database");
    });
});

booksRouter.post("/", Book.validate, async (req, res, next) => {
  try {
    const book = req.body;
    book.id_book = await Book.create(book);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

booksRouter.delete("/:quote", async (req, res, next) => {
  try {
    const { quote } = req.params;
    const bookDeleted = await Book.deleteBook(quote);
    if (bookDeleted) {
      res.status(200).send("Book deleted");
    } else {
      throw (500, "This book cannot be deleted");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = booksRouter;
