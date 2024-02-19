import React, { useState } from 'react';

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
  TextField,
  DialogContentText,
} from '@mui/material';

import ModalInput from '../global/ModalInput';
import axios from 'axios';
function UserRegisterModal(props) {
  const { open, setOpen } = props;
  const { name, setName } = useState('');
  const { description, setDescription } = useState('');
  const { password, setPassword } = useState('');
  const { email, setEmail } = useState('');
  const { ovsCode, setOvsCode } = useState('');
  const { role, setRole } = useState('');

  const handleOpen = (e) => {
    setOpen(false);
  };
  const handleClose = () => {
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
  const onChangeOvsCode = (e) => {
    setOvsCode(e.target.value);
    console.log(ovsCode);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const onChangeRole = (e) => {
    setRole(e.target.value);
    console.log(role);
  };
  const handleRegister = (e) => {
    setOpen(false);
    const response = axios
      .post(requests.POST_REGISTER(), {
        name,
        password,
        description,
        email,
        role,
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      //   PaperProps={{
      //     component: 'form',
      //     onSubmit: (event) => {
      //       event.preventDefault();
      //       const formData = new FormData(event.currentTarget);
      //       const formJson = Object.fromEntries(formData.entries());
      //       const email = formJson.email;
      //       console.log(email);
      //       handleClose();
      //     },
      //   }}
    >
      <DialogTitle>사용자 등록</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}
        {/* <TextField
          autoFocus
          required
          margin='dense'
          id='name'
          name='email'
          label='Email Address'
          type='email'
          fullWidth
          variant='standard'
        /> */}
        <ModalInput label='사번' sx={InputStyle} onChange={onChangeName} />
        <ModalInput label='이메일' sx={InputStyle} onChange={onChangeEmail} />
        <ModalInput
          label='이름'
          sx={InputStyle}
          onChange={onChangeDescription}
        />
        <ModalInput
          label='비밀번호'
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
            value={ovsCode}
            label=''
            onChange={onChangeOvsCode}
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
            value={ovsCode}
            label=''
            onChange={onChangeOvsCode}
            sx={SelectStyle}
          >
            <MenuItem value='ARS'>ARS</MenuItem>
            <MenuItem value='USD'>USD</MenuItem>
            <MenuItem value='KRW'>KRW</MenuItem>
          </Select>
        </FormControl>{' '}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleRegister}>Subscribe</Button>
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
export default UserRegisterModal;
