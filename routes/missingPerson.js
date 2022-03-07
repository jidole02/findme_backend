const express = require("express");
const MissingPerson = require("../schemas/missingPerson");

const router = express.Router();

router.post("/write/regist", async (req, res, next) => {
  const { name, age, adress, x, y, date } = req.body;
  try {
    const person = await MissingPerson.create({
      name,
      age,
      adress,
      x,
      y,
      date,
    });
    console.log(person);
    res.status(201).json(person);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
