//컨트롤러로 라우터와 분리해서 작업부분은 컨트롤러에서 작업

const User = require("../models/User"); //임시 데이터 저장소 연결

module.exports.create = async (req, res) => {
  try {
    const { userID, password, info } = req.body;

    const user = new User({ userID, password, info });

    await user.save();

    return res.send(User);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.find = async (req, res) => {
  try {
    const { userID } = req.params;

    if (userID) {
      const user = await User.findOne({ userID });

      if (!user) return res.status(404).send("user not found");
      return res.send(user);
    }
    const users = await User.find({}); //모든 유저 정보를 리턴
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findOne({ userID });

    if (!user) return res.status(404).send("user not found");

    await user.remove();
    return res.send();
  } catch (err) {
    return res.status(500).send(err);
  }
};
