import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminOfficeDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button size='sm' onClick={handleClickOpen}>
        Insert Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const text = formJson.text;
            console.log(text);
            handleClose();
          },
        }}
      >
        <DialogTitle>사무소 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>추가할 정보를 입력해주세요</DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='cop-code'
            name='cop-code'
            label='법인 코드'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='office-code'
            name='office-code'
            label='사무소 코드'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='office-name'
            name='office-name'
            label='사무소 이름'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='home-currency'
            name='home-currency'
            label='현지통화'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='away-currency'
            name='away-currency'
            label='송금통화'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='gl-currency'
            name='gl-currency'
            label='장부통화'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='start-date'
            name='start-date'
            label='시작날짜'
            type='date'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='end-date'
            name='end-date'
            label='종료날짜'
            type='date'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit'>추가완료</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
