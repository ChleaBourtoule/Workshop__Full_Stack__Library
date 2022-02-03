const connection = require("../db-config");
const Joi = require("joi");

const db = connection.promise();

const validate = (req, res, next) => {
  let required = "optional";
  if (req.method === "POST") {
    required = "required";
  }
  const errors = Joi.object({
    quote: Joi.string().max(5).presence(required),
    date: Joi.date().presence(required),
    pages: Joi.number().integer().presence(required),
    format: Joi.boolean().presence(required),
    id_author: Joi.number().integer().presence(required),
    id_publishing_house: Joi.number().integer().presence(required),
    name: Joi.string().max(255).presence(required),
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    next(422, errors.message);
  } else {
    next();
  }
};

const findBooks = ({ filters: { title } }) => {
  let sql = `SELECT name, quote FROM books`;
  const sqlValues = [];

  if (title) {
    sql += ` WHERE name LIKE ?`;
    sqlValues.push(title);
  }
  return db.query(sql, sqlValues).then(([results]) => results);
};

const findOneBook = (quote) => {
  return db
    .query(
      `SELECT DATE_FORMAT(b.date, '%d/%m/%Y') AS date, b.name as title, b.pages, b.quote, b.format, p.name as house, a.name as author_name, a.firstname as author_firstname, a.nationality as nationality  FROM  books b INNER JOIN authors a ON b.id_author = a.id_author INNER JOIN publishing_houses p ON b.id_publishing_house = p.id_publishing_house WHERE b.quote = ?`,
      [quote]
    )
    .then(([results]) => results[0]);
};

const create = ({
  quote,
  date,
  pages,
  format,
  id_author,
  id_publishing_house,
  name,
}) => {
  return db
    .query(
      `INSERT INTO books (quote,
        date,
        pages,
        format,
        id_author,
        id_publishing_house, name) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [quote, date, pages, format, id_author, id_publishing_house, name]
    )
    .then(([result]) => {
      return {
        quote,
        date,
        pages,
        format,
        id_author,
        id_publishing_house,
        name,
      };
    });
};

const deleteBook = async (quote) => {
  return db
    .query("DELETE FROM books WHERE quote = ?", [quote])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = {
  findBooks,
  findOneBook,
  create,
  deleteBook,
  validate,
};
