import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/system';

import requests from '../api/config';
import { defaultApi } from '../api/axios';

import LoginBgImg from '../assets/loginBg.png';
import Container from '../components/global/Container';
import Input from '../components/global/Input';
import Button from '../components/global/Button';

const LoginBg = styled.div`
  width: 100vw;
  height: 100vh;
  background: center / cover no-repeat url('${LoginBgImg}');
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Login(props) {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const onChangeName = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const handleLogin = async () => {
    try {
      console.log(name, password);
      const response = await defaultApi.post(requests.POST_LOGIN(), {
        name,
        password,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <LoginBg>
        <Container width='30' height='60'>
          <Box
            sx={{
              height: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: '15vh',
            }}
          >
            <Input
              widthV='20'
              heightV='5'
              label='아이디'
              value={name}
              onChange={onChangeName}
            />
            <Input
              widthV='20'
              heightV='5'
              label='비밀번호'
              value={password}
              onChange={onChangePassword}
            />
            <br />
            <Button size='lg' width='70%' onClick={handleLogin}>
              로그인
            </Button>
          </Box>
        </Container>
      </LoginBg>
    </div>
  );
}
