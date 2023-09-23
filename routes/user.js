const express = require("express");
const router = express.Router();
const dbConnection = require("../config/mysql");
const bcrypt = require('bcrypt');

router.post('/register', async (req, res)=>{
  try {
    let body = {...req.body}

    // Salt and hash the password
    const saltRounds = 10; // the cost of processing the data
    const hashedPassword = await bcrypt.hash(body.pw, saltRounds);
    
    let sql = 'INSERT INTO user(id,pw,nickname,email,region) VALUES(?,?,?,?,?)'
    let params = [body.id, hashedPassword, body.nickname, body.email, body.region]

    dbConnection.connect();

    dbConnection.query(sql, params, (error)=>{
      if(error) {
        console.error('Error executing the query: '+ error.stack);
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200)
      }

    })
    
  } catch (error) {
    console.error(error);
    res.status(500).send('DB저장 실패.');
  }
  dbConnection.end();
})



module.exports = router;