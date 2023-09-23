const express = require("express");
const router = express.Router();

const db = require("../config/mysql");
const conn = db.init();

router.post('/register', (req, res)=>{
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

module.exports = router;