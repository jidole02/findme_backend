const express = require("express");
const MissingPerson = require("../schemas/missingPerson");
const nodemailer = require("nodemailer");
const smtpPool = require("nodemailer-smtp-pool");

const router = express.Router();

const smtpTransport = nodemailer.createTransport(
  smtpPool({
    service: "Gmail",
    host: "localhost",
    port: "8081",
    tls: {
      rejectUnauthorize: false,
    },
    auth: {
      user: "jidole01@gmail.com",
      pass: "hiaymeqfujumsepm",
    },
    maxConnections: 30,
    maxMessages: 30,
  })
);

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
      description: req.body.description,
    });
    res.status(201).json(person);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/alert", async (req, res, next) => {
  try {
    const personDetail = await MissingPerson.findOne({ _id: req.query.id });
    const person = await MissingPerson.deleteOne({ _id: req.query.id });
    const mailOpt = {
      to: "jidole041214@naver.com",
      from: "jidole01@gmail.com",
      subject: "실종자 발견 메일입니다.",
      html: `<div>${personDetail.name}님(${personDetail.age}세) 이 발견되었습니다.
       확인 부탁드립니다.<br/>
       발견자의 말 : ${req.query.description} </div>`,
    };
    smtpTransport.sendMail(mailOpt, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message send :" + res);
      }

      smtpTransport.close();
    });
    res.status(201).json(person);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
