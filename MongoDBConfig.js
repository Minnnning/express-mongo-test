const mongoose = require("mongoose");

const express = require("express"); // Express 모듈을 가져옴
const app = express();
app.use(express.urlencoded({ extended: true }));

// Express Option : JSON 형태로 데이터 통신
app.use(express.json());

let db;

/**
 * MongoDB URL 지정
 * @formatting : mongodb://localhost/my_database'
 */
const MONGO_URL = "mongodb://minnnning:alswjd1126@localhost:27017";
const MONGO_DB_NAME = "test";

// Express Cofig
const EXPRESS_ROUTER_PORT = "8080";

/**
 * [STEP1] MongoDB Connection
 */
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGO_DB_NAME,
  })
  .then(() => {
    console.log(`[+] mongoseDB Connection`);
  })
  .catch((err) => console.error(`[-] mongoseDB ERROR :: ${err}`));

/**
 * [STEP2] Express Route 구성
 */
app.listen(EXPRESS_ROUTER_PORT, () => {
  console.log(`Example app listening on port ${EXPRESS_ROUTER_PORT}`);
});

/**
 * [STEP3] Express Option으로 구성한 Router를 등록
 */
//app.use("/", require("../routes/a"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); //__dirname은 파일명(index.html)을 제외한 절대경로
}); //__filename은 파일명을 포함한 절대 경로

app.get("/product", (req, res) => {
  //파라미터 req는 요청, res는 응답
  res.send("상품페이지");
});

app.get("/input", (req, res) => {
  res.sendFile(__dirname + "/input.html");
});

app.post("/add", (req, res) => {
  //post형식 전송 코드 작성
  console.log(req.body);
  console.log(req.body.title); //input.js의 name="title"
  console.log(req.body.content); //input.js의 name="content"
  res.send("전송완료");
  MONGO_DB_NAME.collection("post").insertOne(
    { 제목: req.body.title, 내용: req.body.content },
    () => {
      console.log("저장완료");
    }
  );
});
