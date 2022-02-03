const authorsRouter = require("express").Router();
const Author = require("../models/author");

authorsRouter.get("/", (req, res) => {
  Author.findAuthors()
    .then((authors) => {
      res.json(authors);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving authors from database");
    });
});

authorsRouter.get("/:id", (req, res) => {
  Author.findOneAuthor(req.params.id)
    .then((author) => {
      if (author) {
        res.json(author);
      } else {
        res.status(404).send("Author not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error retrieving the author from the database");
    });
});

authorsRouter.post("/", Author.validate, async (req, res, next) => {
  try {
    const author = req.body;
    author.id_author = await Author.create(author);
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
});

authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { idAuthor } = req.params;
    const authorDeleted = await Author.deleteAuthor(idAuthor);
    if (authorDeleted) {
      res.status(200).send("Author deleted");
    } else {
      throw (500, "This author cannot be deleted");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = authorsRouter;
