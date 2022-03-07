const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    "mongodb://jidole02:fprhwhdk1214@localhost:27017/admin",
    {
      dbName: "findme",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("몽고디비 연결 에러", err);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};
mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("연결이 끊겼습니다, 재시도합니다");
  connect();
});

module.exports = connect;
