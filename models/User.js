const pool = require("../config/mysql");

class User {
  static findById(id, callback) {
    let sql = 'SELECT * FROM user WHERE id = ?';
    let params = [id];
    let user;
    
    pool.getConnection((error, connection)=>{
      connection.query(sql, params, (error, result)=>{
        if(error) {
          console.error('Error executing the query: '+ error.stack)
          callback(error, null);
        }
        else {
          callback(null, result[0])
          connection.release();
          
        }
      })
    })
    
  }
}

module.exports = User;