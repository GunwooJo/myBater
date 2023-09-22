const express = require('express');
const path = require('path');
const app = express();
const db = require("./config/mysql");
const conn = db.init();

//유저가 보낸 object, array데이터 출력해보기 위함.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//다른 도메인 주소끼리 ajax요청 가능하게함.
const cors = require('cors');
app.use(cors());


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

//이 코드는 반드시 가장 하단에 놓여야 함. 고객에 URL란에 아무거나 입력하면 index.html(리액트 프로젝트 빌드파일)을 전해달란 의미.
app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.post('/user/register', (req, res)=>{
  let body = {...req.body}
  let sql = 'INSERT INTO user(id,pw,nickname,email,region) VALUES(?,?,?,?,?)'
  let params = [body.id, body.pw, body.nickname, body.email, body.region]

  conn.query(sql, params, (error)=>{
    if(error) {
      console.log('쿼리 실행 안됨: '+ error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }

  })
})