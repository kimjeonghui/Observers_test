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
        추가 Insert Dialog
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
            id='ovs_cop_cd'
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
            id='ovs_cd'
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
            id='ovs_meaning'
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
            id='loc_curr'
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
            id='trans_curr'
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
            id='gl_curr'
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
            id='start_date'
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
            id='end_date'
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
