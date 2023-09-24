const express = require("express");
const router = express.Router();
const dbConnection = require("../config/mysql");
const bcrypt = require('bcrypt');

//회원가입 요청 처리
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

//로그인 요청 처리
router.post('/login', async (req, res)=>{
  try {
    const body = {...req.body};

    let sql = 'SELECT * FROM user WHERE id = ?';
    let params = [body.id];

    dbConnection.connect();

    dbConnection.query(sql, params, (error, result)=>{
      if(error) {
        console.error('Error executing the query: '+ error.stack);
        res.sendStatus(500);
      }
      else {
        const user = result[0];
        dbConnection.end();
        
        //If user not found or password does not match, send error response
        if(!user || !bcrypt.compareSync(body.pw, user.pw)) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Here you would typically create a token or a session and send it to the client
        // For simplicity, we're just sending a success message
        res.json({ message: 'Login successful!' });
        console.log('로그인 성공');
      }

    })
    
  } catch (error) {
    console.error('Error handling login request:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
})


module.exports = router;