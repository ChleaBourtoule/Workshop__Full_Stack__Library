const booksRouter = require("./books");
const authorsRouter = require("./authors");
const publishing_housesRouter = require("./publishing_houses");

const setupRoutes = (app) => {
  // Books routes
  app.use("/api/books", booksRouter);
  app.use("/api/authors", authorsRouter);
  app.use("/api/publishing_houses", publishing_housesRouter);
};

module.exports = {
  setupRoutes,
};
