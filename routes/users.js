//라우터코드는 라우팅 요청과 작업을 연결하는 역할만 한다 관리하기 쉽게 작업코드는 컨트롤러에 작성

const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

//생성요청
router.post("/", users.create);

//read
router.get("/:userID?", users.find);

//delete
router.delete("/:userID", users.remove);

module.exports = router;
