const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.loginUser = (req, res) => {
  const body = {...req.body};
  User.findById(body.id, (error, result)=>{
    if(error) {
      console.log(error)
    }
    else {
      let user = result;

      //If user not found or password does not match, send error response
      if (!user || !bcrypt.compareSync(body.pw, user.pw)) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Here you would typically create a token or a session and send it to the client
      // For simplicity, we're just sending a success message
      res.json({ message: 'Login successful!' });
      console.log('로그인 성공');
    }
  });
}