import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import receipt_img from '../assets/spain2.jpeg';
import styled from 'styled-components';

const ImgButton = styled.button`
  margin: 4px;
  background-color: #f6f6f6;
  border: 2px solid #f6f6f6;
  border-radius: 5px;
  padding: 5px 10px 3px;
  cursor: pointer;

  &:hover {
    background-color: #ddd; /* 마우스 호버 시 배경색 변경 예제 */
  }
`;

function ReceiptsMonth(props) {
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/receipts/2023-10/${id}`);
  };

  return (
    <Box
      sx={{
        display: 'flow',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      <Typography variant='h6' style={{ fontSize: '23px', marginLeft: '12px' }}>
        2023-10
      </Typography>
      <ImgButton>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{
            width: '150px',
            height: '150px',
            margin: '7px',
          }}
          onClick={() => handleButtonClick('1')}
        />
      </ImgButton>
      <ImgButton>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </ImgButton>
      <ImgButton>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </ImgButton>
      <ImgButton>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </ImgButton>
      <ImgButton>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </ImgButton>
    </Box>
  );
}

export default ReceiptsMonth;
