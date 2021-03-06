const express = require("express");
const MissingPerson = require("../schemas/missingPerson");
const router = express.Router();

router.get("/all", async (req, res, next) => {
  try {
    const person = await MissingPerson.find({});
    res.status(201).json(
      person.map((obj) => {
        return {
          name: obj.name,
          x: obj.x,
          y: obj.y,
          id: obj._id,
          adress: obj.adress,
        };
      })
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/near", async (req, res, next) => {
  try {
    console.log(req.body.x, req.body.y);
    const range = 1;
    const nearPesrons = await MissingPerson.find({
      x: {
        $gte: parseInt(req.body.x) - range,
        $lte: parseInt(req.body.x) + range,
      },
      y: {
        $gte: parseInt(req.body.y) - range,
        $lte: parseInt(req.body.y) + range,
      },
    });
    res.status(201).json(nearPesrons);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const person = await MissingPerson.findOne({ _id: req.query.id });
    res.status(201).json(person);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const persons = await MissingPerson.find({
      name: new RegExp(req.query.keyword),
    });
    res.status(201).json(persons);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
