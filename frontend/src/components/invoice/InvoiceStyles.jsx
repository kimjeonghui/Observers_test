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
