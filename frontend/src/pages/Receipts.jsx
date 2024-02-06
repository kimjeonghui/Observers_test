import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/global/Button';
import { useTheme } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';

export default function Receipts(props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/receipts/${id}`);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <CustomButton
          color={theme.palette.posco_lg_300}
          fontColor={theme.palette.posco_gray_500}
          hoverColor={theme.palette.posco_gray_100}
          size='sm'
          onClick={() => handleButtonClick('2023-10')}
        >
          <FolderIcon />
          <span style={{ marginLeft: '5px' }}>2023-10</span>
        </CustomButton>
        <CustomButton
          color={theme.palette.posco_lg_300}
          fontColor={theme.palette.posco_gray_500}
          hoverColor={theme.palette.posco_gray_100}
          size='sm'
          onClick={() => handleButtonClick('2023-11')}
        >
          <FolderIcon />
          <span style={{ marginLeft: '5px' }}>2023-11</span>
        </CustomButton>
        <CustomButton
          color={theme.palette.posco_lg_300}
          fontColor={theme.palette.posco_gray_500}
          hoverColor={theme.palette.posco_gray_100}
          size='sm'
          onClick={() => handleButtonClick('2023-12')}
        >
          <FolderIcon />
          <span style={{ marginLeft: '5px' }}>2023-12</span>
        </CustomButton>
        <CustomButton
          color={theme.palette.posco_lg_300}
          fontColor={theme.palette.posco_gray_500}
          hoverColor={theme.palette.posco_gray_100}
          size='sm'
          onClick={() => handleButtonClick('2024-01')}
        >
          <FolderIcon />
          <span style={{ marginLeft: '5px' }}>2024-01</span>
        </CustomButton>
        <CustomButton
          color={theme.palette.posco_lg_300}
          fontColor={theme.palette.posco_gray_500}
          hoverColor={theme.palette.posco_gray_100}
          size='sm'
          onClick={() => handleButtonClick('2024-02')}
        >
          <FolderIcon />
          <span style={{ marginLeft: '5px' }}>2024-02</span>
        </CustomButton>
      </Box>
    </div>
  );
}
