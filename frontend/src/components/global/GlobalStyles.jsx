import styled from '@emotion/styled';
import { createTheme } from '@mui/material/styles';
import BgImg from '../../assets/bg.png';

export const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: center / cover no-repeat url('${BgImg}');
`;

export const theme = createTheme({
  palette: {
    posco_blue_100: '#009FFF',
    posco_blue_300: '#007FCB',
    posco_blue_500: '#05507D',
    posco_blue_700: '#033451',
    posco_blue_900: '#012338',
    posco_lb_100: '#8BD9F7',
    posco_lb_300: '#3EC9FF',
    posco_lb_500: '#00A5E5',
    posco_lb_700: '#00709B',
    posco_lb_900: '#004B68',
    posco_gray_100: '#A1AAAA',
    posco_gray_300: '#757E7E',
    posco_gray_500: '#4B5151',
    posco_gray_700: '#383F3F',
    posco_gray_900: '#282E2E',
    posco_lg_100: '#E7E7E7',
    posco_lg_300: '#D7D7D7',
    posco_lg_500: '#BDBDBA',
    posco_lg_700: '#B0B0B0',
    posco_lg_900: '#919191',
    posco_white: '#FFFFFF',
    posco_black: '#1F1F1F',
  },
});
