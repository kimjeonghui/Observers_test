import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    background-color: #ddd;
  }
`;

function EvidenceMonth() {
  const navigate = useNavigate();

  const handleButtonClick = (month, evidenceId) => {
    navigate(`/evidence/${month}/${evidenceId}`);
  };

  // useParams hook을 사용하여 URL 파라미터를 추출
  const { month } = useParams();

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
        {month}
      </Typography>
      <ImgButton onClick={() => handleButtonClick(`${month}`, '1')}>
        <Typography variant='body1'>{month}-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{
            width: '150px',
            height: '150px',
            margin: '7px',
          }}
        />
      </ImgButton>
    </Box>
  );
}

export default EvidenceMonth;
