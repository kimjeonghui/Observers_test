import React from 'react';
import CustomButton from '../components/global/Button';
import { useTheme } from '@mui/material/styles';

export default function Ocr(props) {
  const theme = useTheme();
  return (
    <div>
      <CustomButton
        color={theme.palette.posco_blue_300}
        fontColor={theme.palette.gray_700}
        hoverColor={theme.palette.posco_blue_100}
        size='sm'
      />
    </div>
  );
}
