import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MenuItem, Select, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import { userState } from '../../state/UserState';
export default function OfficeSelector(props) {
  const { curV, setCurV } = props;
  const user = useRecoilValue(userState);
  const [role, setRole] = useState('user');
  const [selectV, setSelectV] = useState('');
  const [ovsCdList, setovsCdList] = useState([]);
  useEffect(() => {
    if (user.role === 'ADMIN' || user.role === 'SYSTEM_ADMIN') setRole('admin');
    handlegetOvsCode();
  }, []);
  useEffect(() => {
    if (curV) {
      setSelectV(curV);
    } else {
      setSelectV(officeCode[0].ovsCd);
    }
  }, [curV]);

  const handlegetOvsCode = () => {
    axios
      .get(`http://localhost:8086/admin-office/codeList`)
      .then((res) => {
        setovsCdList(res.data.ovsCodeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const officeCode = [
    { ovsCd: 'HDF32', ovsMeaning: '유럽' },
    { ovsCd: 'HDF13', ovsMeaning: '브뤼셀' },
    { ovsCd: 'HDF27', ovsMeaning: '아르헨티나' },
    { ovsCd: 'HDF01', ovsMeaning: '호주' },
    { ovsCd: 'HDF02', ovsMeaning: '브라질' },
    { ovsCd: 'HDF03', ovsMeaning: '캐나다' },
    { ovsCd: 'HDF04', ovsMeaning: '중국' },
  ];

  const handleCurVChange = (e) => {
    setCurV(e.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size='small'>
      <Typography
        my={1}
        sx={{
          fontSize: { xs: '12px', sm: '14px', md: '16px' },
          fontWeight: 600,
        }}
      >
        사무소코드
      </Typography>
      {role === 'admin' ? (
        <Select
          value={selectV}
          label=''
          onChange={handleCurVChange}
          sx={{ backgroundColor: '#F5F6FA' }}
        >
          {ovsCdList?.map((office) => {
            return (
              <MenuItem key={office.ovsCd} value={office.ovsCd}>
                {office.ovsMeaning}
              </MenuItem>
            );
          })}
        </Select>
      ) : (
        <Select
          value=''
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value=''>{selectV}</MenuItem>
        </Select>
      )}
    </FormControl>
  );
}
