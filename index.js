const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); //ejs를 사용할 파일의 위치

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("기본 url에 접속했습니다");
});

//라우터를 사용하겠다
const userRouter = require("./routes/users");
app.use("/users", userRouter);

mongoose
  .connect(
    "mongodb://minnnning:alswjd1126@localhost:27017/?authMechanism=DEFAULT",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb connect"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
