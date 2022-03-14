const path = require("path");
const multer = require("multer");
const fs = require("fs");
const express = require("express");
const router = express.Router();

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

router.post("/upload", type, (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

module.exports = router;
