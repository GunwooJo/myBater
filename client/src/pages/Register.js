import { useState } from 'react';
import '../styles/register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Handle actual registration logic here
    try {
      const response = await axios.post('/user/register', {
        id: id,
        pw: pw,
        nickname: nickname,
        email: email,
        region: region
      });

      if(response.status === 200) {
        alert('회원가입 성공');
        navigate('/');
      }
      
    } catch (error) {
      console.log(error)

      if(error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        alert('회원가입에 실패했습니다. 재시도 부탁드립니다.');
      }
      else if(error.request) {
        // The request was made but no response was received
        console.log(error.request);
        alert('회원가입 실패: 서버로부터 응답이 없습니다.');
      }
      else {
        // Something happened in setting up the request that triggered an Error
        alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
      }
    

    }
    
  }

  return (
    <div className="register-page">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={id}
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
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="region">거래 희망 지역</label>
          <select 
            id="region" 
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          >
            <option value="">지역 선택</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
            <option value="대전">대전</option>
            <option value="대구">대구</option>
            <option value="광주">광주</option>
            <option value="울산">울산</option>
            <option value="부산">부산</option>
          </select>
        </div>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Register;