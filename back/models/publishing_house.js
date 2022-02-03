const connection = require("../db-config");
const Joi = require("joi");

const db = connection.promise();

const validate = (req, res, next) => {
  let required = "optional";
  if (req.method === "POST") {
    required = "required";
  }
  const errors = Joi.object({
    name: Joi.string().max(255).presence(required),
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
    next(422, errors.message);
  } else {
    next();
  }
};

const findPublishingHouses = () => {
  let sql = `SELECT name, id_publishing_house FROM publishing_houses`;

  return db.query(sql).then(([results]) => results);
};

const findOnePublishingHouse = (id_publishing_house) => {
  return db
    .query(
      `SELECT name FROM  publishing_houses WHERE id_publishing_house = ?`,
      [id_publishing_house]
    )
    .then(([results]) => results[0]);
};

const create = ({ name }) => {
  return db
    .query(`INSERT INTO publishing_houses (name) VALUES (?)`, [name])
    .then(([result]) => {
      const id_publishing_house = result.insertId;
      return { name, id_publishing_house };
    });
};

const deletePublishingHouse = async (id_publishing_house) => {
  return db
    .query("DELETE FROM publishing_houses WHERE id_publishing_house = ?", [
      id_publishing_house,
    ])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = {
  findPublishingHouses,
  findOnePublishingHouse,
  create,
  deletePublishingHouse,
  validate,
};
