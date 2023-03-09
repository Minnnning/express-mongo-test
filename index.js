const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("기본 url에 접속했습니다");
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});

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
