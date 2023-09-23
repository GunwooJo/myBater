import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'; 
import axios from "axios";

function Login() {
  
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const navigate = useNavigate();

  //로그인 버튼 눌렀을 때 벌어질 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/user/login', {
        id: id,
        pw: pw
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={id}
            maxLength={30}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
        <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            id="pw"
            value={pw}
            maxLength={30}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
        <button type="button" onClick={()=>navigate('/user/register')}>회원가입</button>
      </form>
    </div>
  );
}

export default Login;