import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

import SearchInput from '../global/SearchInput';

export default function InvoiceSearch(props) {
  const [subject, setSubject] = useState('');
  const theme = useTheme();
  const handleChange = (event) => {
    setSubject(event.target.value);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <select
        name='fruits'
        style={{
          height: '30px',
          backgroundColor: '#f5f6fa',
          border: `0.2px solid ${theme.palette.posco_lg_500}`,
          borderTopLeftRadius: '15px',
          borderBottomLeftRadius: '15px',
          padding: '0 10px',
        }}
      >
        <option value='store'>거래처명</option>
        <option value='description'>거래내역</option>
      </select>
      <SearchInput
        leftRadius={0}
        rightRadius={15}
        width='300px'
        height='30px'
      />
    </div>
  );
}
