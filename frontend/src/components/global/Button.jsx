import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

const CustomButton = styled(
  ({ color, hoverColor, fontColor, size, width, ...rest }) => (
    <Button {...rest} />
  )
)`
  && {
    /* 기본 스타일링 속성들 */
    background-color: ${({ color, theme }) =>
      color || theme.palette.posco_blue_500};
    color: ${({ fontColor, theme }) => fontColor || theme.palette.posco_white};
    height: ${({ size }) => {
      if (size === 'sm') return '47px';
      if (size === 'md') return '50px';
      if (size === 'lg') return '60px';
    }};
    width: ${({ width }) => width};
    padding: ${({ width }) => !width && '0 30px'};
    font-size: ${({ size }) => {
      if (size === 'sm') return '14px';
      if (size === 'md') return '18px';
      if (size === 'lg') return '24px';
    }};
    border-radius: 15px;
  }

  &:hover {
    /* hover 시에 필요한 스타일링 속성들 */
    background-color: ${({ hoverColor, theme }) =>
      hoverColor || theme.palette.posco_blue_300};
    color: ${({ fontColor, theme }) => fontColor || theme.palette.posco_white};
  }
`;

export default function ButtonComponent(props) {
  const { color, fontColor, size, hoverColor, width } = props;
  return (
    <CustomButton
      color={color}
      fontColor={fontColor}
      hoverColor={hoverColor}
      size={size}
      width={width}
    >
      {props.children}
    </CustomButton>
  );
}

// 다른 곳에서 이 컴포넌트를 쓸 때는 아래와 같이 쓰시면 됩니다.

// import Button from '../components/global/Button';

// <Button
//   color={theme.palette.posco_blue_300}
//   fontColor={theme.palette.gray_700}
//   hoverColor={theme.palette.posco_blue_100}
//   size='sm'
//   width='300px'
// >
//   버튼내용
// </Button>;
