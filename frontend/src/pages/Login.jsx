import React from 'react';
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
  const handleLogin = async () => {
    try {
      const response = await defaultApi.post(requests.POST_LOGIN(), {
        name: '',
        password: '',
      });
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
            <Input widthV='20' heightV='5' label='아이디' />
            <Input widthV='20' heightV='5' label='비밀번호' />
            <br />
            <Button size='lg' width='70%'>
              로그인
            </Button>
          </Box>
        </Container>
      </LoginBg>
    </div>
  );
}
