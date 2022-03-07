const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");

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

const indexRouter = require("./routes");
const missingPersonRouter = require("./routes/missingPerson");

app.use("/", indexRouter);
app.use("/", missingPersonRouter);

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
