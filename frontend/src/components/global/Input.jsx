import React from 'react';
import TextField from '@mui/material/TextField';

export default function Input(props) {
  const { widthV, heightV, colorV, label, ...rest } = props;
  const inputStyle = {
    width: widthV + 'vw',
    height: heightV + 'vh',
  };
  return (
    <TextField
      id='standard-basic'
      label={label}
      variant='standard'
      style={inputStyle}
      {...rest}
    />
  );
}
