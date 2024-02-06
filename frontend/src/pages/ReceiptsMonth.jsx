import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import receipt_img from '../assets/spain2.jpeg';

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
      <button style={{ margin: '10px' }}>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </button>
      <button style={{ margin: '10px' }}>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </button>
      <button style={{ margin: '10px' }}>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </button>
      <button style={{ margin: '10px' }}>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </button>
      <button style={{ margin: '10px' }}>
        <Typography variant='body1'>2023-10-03 14:23:11</Typography>
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '150px', height: '150px', margin: '7px' }}
          onClick={() => handleButtonClick('1')}
        />
      </button>
    </Box>
  );
}

export default ReceiptsMonth;
