import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userState, loginState } from '../state/UserState';
export default function Home(props) {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loginState);
  const user = useRecoilValue(userState);

  // 로그인한 사람에 따라 href 해주기
  useEffect(() => {
    if (!isLogin) {
      // 유저정보가 없을때
      navigate('/login');
    } else {
      if (user.role === 'ADMIN' || user.role === 'SYSTEM_ADMIN')
        navigate('/summary');
      else navigate('/invoice');
    }
  }, []);

  return <div>홈입니다.</div>;
}
