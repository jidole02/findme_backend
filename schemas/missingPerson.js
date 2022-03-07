const mongoose = require("mongoose");

const { Schema } = mongoose;
const missingPersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  /*   img: {
    type: String,
    required: true,
  }, */
  adress: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("MissingPerson", missingPersonSchema);
