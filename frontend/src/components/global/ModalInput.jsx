import React from 'react';
import { TextField, Typography } from '@mui/material';
function ModalInput(props) {
  const { width, height, bg, padding, label, ...rest } = props;
  const inputStyle = {
    width: width,
    backgroundColor: '#F5F6FA',
  };

  return (
    <div>
      <Typography
        my={1}
        sx={{
          fontSize: { xs: '12px', sm: '14px', md: '16px' },
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
      <TextField
        hiddenLabel
        id='outlined-basic'
        variant='outlined'
        size='small'
        style={inputStyle}
        {...rest}
      />
    </div>
  );
}

export default ModalInput;
