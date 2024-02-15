import styled from 'styled-components';

export const SpanTab = styled.span`
  margin-right: 16px;
  color: ${(props) => props.theme.palette.posco_lg_500};
  font-weight: 400;
  cursor: pointer;
`;

export const ActiveSpanTab = styled.span`
  margin-right: 16px;
  color: ${(props) => props.theme.palette.posco_blue_100};
  font-weight: 700;
  cursor: pointer;
`;

export const ModalStrokeBtn = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.palette.posco_lg_500};
  &:hover {
    border: 2px solid ${(props) => props.theme.palette.posco_blue_500};
  }
`;

export const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
