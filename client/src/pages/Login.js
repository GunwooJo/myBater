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
      const response = await axios.post('/user/login', {
        id: id,
        pw: pw
      });

      if(response.status === 200) {
        alert('로그인 성공!');
        navigate('/');
      }
      else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }

    } catch (error) {
      console.log(error);
      
      if (error.response.status === 401) {
        
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        alert('아이디와 비밀번호를 다시 확인해주세요.');
      } else if (error.request) {
        // The request was made but no response was received
        alert('로그인 실패: 서버로부터 응답이 없습니다.');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
      }
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