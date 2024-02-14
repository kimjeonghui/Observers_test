import React from 'react';

import styled from 'styled-components';
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width + 'vw'};
  min-width: 320px;
  height: ${(props) => props.height + 'vh'};
  padding: 60px 0;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
`;
export default function Container(props) {
  const { width, height } = props;

  return (
    <ContainerDiv width={width} height={height}>
      {props.children}
    </ContainerDiv>
  );
}
