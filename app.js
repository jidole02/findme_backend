const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const cors = require("cors");

const connect = require("./schemas");

const app = express();
// app.set 으로 'port'라는 변수 설정
app.set("port", process.env.PORT || 8081);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
connect();

dotenv.config();

const writeRouter = require("./routes/write");
const missingRouter = require("./routes/missing");
const imageRouter = require("./routes/image");

// img로 uploads 폴더 접근 가능하도록 하는 미들웨어
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/write", writeRouter);
app.use("/missing", missingRouter);
app.use("/image", imageRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use((req, res, next) => {
  console.log("모든 요청에 다 실행합니다.");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Express");
});

// app.get 으로 'port' 이용ㅣ
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
