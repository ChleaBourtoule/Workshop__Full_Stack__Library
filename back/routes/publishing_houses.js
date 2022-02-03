const publishingRouter = require("express").Router();
const Publishing = require("../models/publishing_house");

publishingRouter.get("/", (req, res) => {
  Publishing.findPublishingHouses()
    .then((house) => {
      res.json(house);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving publishing houses from database");
    });
});

publishingRouter.get("/:id", (req, res) => {
  Publishing.findOnePublishingHouse(req.params.id)
    .then((house) => {
      if (house) {
        res.json(house);
      } else {
        res.status(404).send("Publishing house not found");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send("Error retrieving the publishing house from the database");
    });
});

publishingRouter.post("/", Publishing.validate, async (req, res, next) => {
  try {
    const house = req.body;
    house.id_publishing_house = await Publishing.create(house);
    res.status(201).json(house);
  } catch (err) {
    next(err);
  }
});

publishingRouter.delete("/:id", async (req, res, next) => {
  try {
    const { idHouse } = req.params;
    const houseDeleted = await Publishing.deletePublishingHouse(idHouse);
    if (houseDeleted) {
      res.status(200).send("Publishing house deleted");
    } else {
      throw (500, "This publishing house cannot be deleted");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = publishingRouter;
