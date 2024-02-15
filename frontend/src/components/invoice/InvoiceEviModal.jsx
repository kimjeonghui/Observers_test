import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import CustomButton from '../global/Button';

export default function InvoiceEviModal(props) {
  const { open, setOpen, datas } = props;
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='lg'>
      <DialogTitle>증빙자료 조회</DialogTitle>
      <DialogContent>
        {datas?.map((data) => {
          return (
            <img
              key={data.eviId}
              alt={'증빙자료' + data.eviId}
              src={data.img}
            />
          );
        })}
        {datas.length < 3 && <CustomButton>증빙자료 추가</CustomButton>}
      </DialogContent>
    </Dialog>
  );
}
