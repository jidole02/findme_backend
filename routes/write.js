const express = require("express");
const MissingPerson = require("../schemas/missingPerson");

const router = express.Router();

router.post("/regist", async (req, res, next) => {
  try {
    const person = await MissingPerson.create({
      name: req.body.name,
      age: req.body.age,
      adress: req.body.adress,
      x: req.body.x,
      y: req.body.y,
      image: req.body.image,
      date: new Date(),
    });
    res.status(201).json(person);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/alert", async (req, res, next) => {
  try {
    const person = await MissingPerson.deleteOne({ _id: req.query.id });
    res.status(201).json(person);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
