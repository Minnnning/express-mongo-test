//컨트롤러로 라우터와 분리해서 작업부분은 컨트롤러에서 작업

const User = require("../models/User"); //스키마
const path = require("path"); // 상위 폴더로 가고 싶은데 path.join 없이는 ..적용이 안된다

module.exports.input = (req, res) => {
  console.log("input창 입니다");
  try {
    return res.sendFile(path.join(__dirname + "/../views/input.html"));
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.create = async (req, res) => {
  console.log("생성창 입니다");
  try {
    console.log(req.body);
    const { userID, password, info } = req.body;

    const user = new User({ userID, password, info });

    await user.save().then(() => console.log("save"));
    //저장 위치를 설정하는것을 알아야한다 현재는 test의 users에 저징됨
    return res.send(user); //html에서 보여주기 위함
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.find = async (req, res) => {
  try {
    console.log("검색 입니다");
    const { userID } = req.params;

    if (userID) {
      const user = await User.findOne({ userID });

      if (!user) return res.status(404).send("user not found");
      return res.send(user);
    }

    console.log("리스트 입니다");
    const users = await User.find({}); //입력이 없다면 모든 유저 정보를 리턴

    return res.render("list.ejs", { data: users });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.remove = async (req, res) => {
  console.log("remove");
  try {
    const { userID } = req.params;
    const user = await User.findOne({ userID });

    if (!user) return res.status(404).send("user not found");

    await user.remove();

    const users = await User.find({});
    return res.render("list.ejs", { data: users });
  } catch (err) {
    return res.status(500).send(err);
  }
};
