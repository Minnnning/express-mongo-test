//컨트롤러로 라우터와 분리해서 작업부분은 컨트롤러에서 작업

const User = require("../models/User"); //임시 데이터 저장소 연결

module.exports.create = (req, res) => {
  const { userID, password, info } = req.body;
  User.push({ userID, password, info });
  return res.send(User);
};

module.exports.find = (req, res) => {
  const { userID } = req.params;
  if (userID) {
    for (let i = 0; i < User.lengthl; i++) {
      if (User[i].userID == userID) {
        return res.send(User[i]);
      }
    }
    return res.status(404).send("user not found");
  }
  return res.send(User);
};

module.exports.remove = (req, res) => {
  const { userID } = req.params;
  if (userID) {
    for (let i = 0; i < User.length; i++) {
      if (User[i].userID == req.params.userID) {
        User.splice(i, 1);
        return res.send(User);
      }
    }
  }
  return res.status(404).send("user not found");
};
