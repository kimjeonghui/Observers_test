import React, { useEffect, useState } from 'react';

import requests from '../../api/userConfig';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  MenuItem,
  Select,
  Typography,
  FormControl,
} from '@mui/material';

import ModalInput from '../global/ModalInput';
import axios from 'axios';
function UserUpdateModal(props) {
  const { open, setOpen, user } = props;
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [ovsCd, setovsCd] = useState();
  const [role, setRole] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleOpen = (e) => {
    setOpen(false);
  };
  const handleClose = () => {
    setInit();
    setOpen(false);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };
  const onChangeovsCd = (e) => {
    setovsCd(e.target.value);
    console.log(ovsCd);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const onChangeRole = (e) => {
    setRole(e.target.value);
    console.log(role);
  };
  const onChangeStartDate = (e) => {
    setStartDate(e.target.value);
    console.log(startDate);
  };
  const onChangeEndDate = (e) => {
    setEndDate(e.target.value);
    console.log(endDate);
  };
  const setInit = () => {
    setName('');
    setDescription('');
    setPassword('');
    setovsCd('');
    setEmail('');
    setRole('');
    setStartDate('');
    setEndDate('');
  };
  const handleUpdate = (e) => {
    setOpen(false);
    const response = axios
      .put(requests.PUT_UPDATE(), {
        name,
        password,
        description,
        email,
        ovsCd,
        role,
        endDate,
      })
      .catch((err) => {
        console.error(err);
      });
    setInit();
  };
  useEffect(() => {
    setName(user ? user.name : '');
    setDescription(user ? user.description : '');
    setPassword(user ? user.password : '');
    setovsCd(user ? user.ovsCd : '');
    setEmail(user ? user.email : '');
    setRole(user ? user.role : '');
    setStartDate(user ? user.startDate : '');
    setEndDate(user ? user.endDate : '');
  }, [user]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>사용자 정보 수정</DialogTitle>
      <DialogContent>
        <ModalInput
          label='사번'
          value={name}
          readOnly={true}
          sx={InputStyle}
          disabled
        />
        <ModalInput
          label='이메일'
          value={email}
          sx={InputStyle}
          onChange={onChangeEmail}
        />
        <ModalInput
          label='이름'
          value={description}
          sx={InputStyle}
          onChange={onChangeDescription}
        />
        <ModalInput
          label='새 비밀번호'
          value={password}
          sx={InputStyle}
          onChange={onChangePassword}
        />
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
          <Select
            value={ovsCd}
            label=''
            onChange={onChangeovsCd}
            sx={{
              backgroundColor: '#F5F6FA',
              width: '20vw',
              maxWidth: '250px',
              marginRight: '2vw',
            }}
          >
            <MenuItem value='ARS'>ARS</MenuItem>
            <MenuItem value='USD'>USD</MenuItem>
            <MenuItem value='KRW'>KRW</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }} size='small'>
          <Typography
            my={1}
            sx={{
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              fontWeight: 600,
            }}
          >
            권한
          </Typography>
          <Select
            value={role}
            label=''
            onChange={onChangeRole}
            sx={SelectStyle}
          >
            <MenuItem value='USER'>직원</MenuItem>
            <MenuItem value='SUPER_USER'>사무소장</MenuItem>
          </Select>
        </FormControl>{' '}
        <ModalInput
          value={startDate}
          onChange={onChangeStartDate}
          type='date'
          label='시작일'
        />
        <ModalInput
          value={endDate}
          onChange={onChangeEndDate}
          type='date'
          label='만료일'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleUpdate}>수정</Button>
      </DialogActions>
    </Dialog>
  );
}
const InputStyle = {
  width: '80vw',
  maxWidth: '550px',
};
const SelectStyle = {
  backgroundColor: '#F5F6FA',
  width: '20vw',
  maxWidth: '250px',
};
export default UserUpdateModal;
