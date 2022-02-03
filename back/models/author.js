const connection = require("../db-config");
const Joi = require("joi");

const db = connection.promise();

const validate = (req, res, next) => {
  let required = "optional";
  if (req.method === "POST") {
    required = "required";
  }
  const errors = Joi.object({
    name: Joi.string().max(100).presence(required),
    firstname: Joi.string().max(100).presence(required),
    birthdate: Joi.date().presence(required),
    nationality: Joi.string().max(100).presence(required),
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    next(422, errors.message);
  } else {
    next();
  }
};

const findAuthors = () => {
  let sql = `SELECT name, firstname, id_author FROM authors`;

  return db.query(sql).then(([results]) => results);
};

const findOneAuthor = (id_author) => {
  return db
    .query(
      `SELECT DATE_FORMAT(a.birthdate, '%d/%m/%Y') AS birthdate, a.name, a.firstname, a.nationality FROM  authors a INNER JOIN books b ON b.id_author = a.id_author WHERE a.id_author = ?`,
      [id_author]
    )
    .then(([results]) => results[0]);
};

const create = ({ name, firstname, birthdate, nationality }) => {
  return db
    .query(
      `INSERT INTO authors (name,
        firstname,
        birthdate,
        nationality) VALUES (?, ?, ?, ?)`,
      [name, firstname, birthdate, nationality]
    )
    .then(([result]) => {
      const id_author = result.insertId;
      return { name, firstname, birthdate, nationality, id_author };
    });
};

const deleteAuthor = async (id_author) => {
  return db
    .query("DELETE FROM authors WHERE id_author = ?", [id_author])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = {
  findAuthors,
  findOneAuthor,
  create,
  deleteAuthor,
  validate,
};
