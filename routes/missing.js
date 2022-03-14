const express = require("express");
const MissingPerson = require("../schemas/missingPerson");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const path = require("path");

// 업로드 폴더 구축
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

// multer init
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// get image url
const type = upload.single("file");
router.post("/upload/img", type, (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

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
    const nearPesrons = await MissingPerson.find({
      x: { $gte: parseInt(req.body.x) - 0.5, $lte: parseInt(req.body.x) + 0.5 },
      y: { $gte: parseInt(req.body.y) - 0.5, $lte: parseInt(req.body.y) + 0.5 },
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

module.exports = router;
