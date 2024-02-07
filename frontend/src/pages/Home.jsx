import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home(props) {
  const navigate = useNavigate();
  // 로그인한 사람에 따라 href 해주기
  useEffect(() => {
    //if(관리자일때) navigate('/summary');
    //else navigate('/invoice');
  }, []);

  return <div>홈입니다.</div>;
}
