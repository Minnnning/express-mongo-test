//라우터코드는 라우팅 요청과 작업을 연결하는 역할만 한다 관리하기 쉽게 작업코드는 컨트롤러에 작성

const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

//입력양식을 보여준다
router.get("/", users.input);

//저장하는 컨트롤
router.post("/add", users.create); //ok

//read
router.get("/list/:userID?", users.find); //ok

//delete
router.get("/:userID", users.remove); // 리스트뷰를 따로 생성해서 각각의 리스트 정보를 보여주고
//삭제 버튼을 mothod=delete 설정한다

module.exports = router;
