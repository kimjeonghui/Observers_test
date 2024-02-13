import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

import SearchInput from '../global/SearchInput';

export default function AccountingSlipSearch(props) {
  const [subject, setSubject] = useState('');
  const theme = useTheme();
  const handleChange = (event) => {
    setSubject(event.target.value);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
      <SearchInput
        leftRadius={15}
        rightRadius={15}
        width='300px'
        height='30px'
        placeholder='INVOICE_NUM을 입력해주세요.'
      />
    </div>
  );
}
