import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import requests from '../../api/userConfig';
import SearchInput from '../global/SearchInput';
import axios from 'axios';

export default function UserSearch(props) {
  const { setTableData } = props;
  const [subject, setSubject] = useState('name');
  const [value, setValue] = useState('');
  const theme = useTheme();
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
    console.log(subject);
  };
  const handleSearch = () => {
    console.log(subject, value);
    axios
      .get(requests.GET_SEARCH_USERS(subject, value))
      .then((res) => {
        setTableData(res.data.userList);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(value);
  }, [value]);
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
        onChange={handleChangeSubject}
      >
        <option value='name'>사번</option>
        <option value='description'>사원명</option>
        <option value='email'>이메일</option>
        <option value='role'>권한</option>
      </select>
      <SearchInput
        leftRadius={0}
        rightRadius={15}
        width='300px'
        height='30px'
        value={value}
        setValue={setValue}
        searchValue={handleSearch}
      />
    </div>
  );
}
