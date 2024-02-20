import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';

import requests from '../api/userConfig';
import { userState, loginState } from '../state/UserState';
import LoginBgImg from '../assets/login_bg.png';
import Container from '../components/global/Container';
import Input from '../components/global/Input';
import Button from '../components/global/Button';
import Logo from '../components/global/Logo';

const LoginBg = styled.div`
  width: 100vw;
  height: 100vh;
  background: center / cover no-repeat url('${LoginBgImg}');
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Login(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    axios
      .post(requests.POST_LOGIN(), {
        name,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLogin(true);
        }
        const data = response.data.user;
        console.log(data);
        // response로 받은 유저 정보 상태관리하기
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <LoginBg>
        <Container width='35' height='60'>
          <Logo height='50px' />
          <div
            style={{
              height: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 'auto 0',
            }}
          >
            <Input
              widthV='20'
              heightV='5'
              label='아이디'
              value={name}
              onChange={onChangeName}
              sx={{ mb: '24px' }}
            />
            <Input
              widthV='20'
              heightV='5'
              label='비밀번호'
              type='password'
              value={password}
              onChange={onChangePassword}
              sx={{ mb: '60px' }}
            />

            <Button size='lg' width='70%' onClick={handleLogin}>
              로그인
            </Button>
          </div>
        </Container>
      </LoginBg>
    </div>
  );
}
