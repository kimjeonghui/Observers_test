import React from 'react';

import styled from '@emotion/styled';
export default function Container(props) {
  const { width, height } = props;
  const ContainerDiv = styled.div`
    width: ${width}vw;
    height: ${height}vh;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.8);
  `;
  return <ContainerDiv>{props.children}</ContainerDiv>;
}
