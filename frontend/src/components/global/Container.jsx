import React from 'react';

import styled from 'styled-components';
const ContainerDiv = styled.div`
  width: ${(props) => props.width + 'vw'};
  min-width: 320px;
  height: ${(props) => props.height + 'vh'};
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
`;
export default function Container(props) {
  const { width, height } = props;

  return (
    <ContainerDiv width={width} height={height}>
      {props.children}
    </ContainerDiv>
  );
}
