import React from 'react';
import styled from 'styled-components'; // styled는 그대로 넣어줌
import Button from '@mui/material/Button'; // mui에서 import한 버튼 컴포넌트
import { useTheme } from '@mui/system';

export default function ButtonComponent(props) {
  const { color } = props;
  const theme = useTheme(); // 테마 참조 추가
  const CustomButton = styled(Button)`
    background-color: ${color || theme.palette.posco_blue_500};
  `;

  return <CustomButton>{props.children}</CustomButton>;
}
