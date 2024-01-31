import React from 'react';

import styled from '@emotion/styled';
import { useTheme } from '@mui/system';
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
  const theme = useTheme();
  return (
    <div>
      <LoginBg>
        <Container width='30' height='60'>
          <Input widthV='20' heightV='5' label='아이디' />
          <Input widthV='20' heightV='5' label='비밀번호' />
          <Button color={theme.palette.posco_lb_100}>로그인</Button>
        </Container>
      </LoginBg>
    </div>
  );
}
