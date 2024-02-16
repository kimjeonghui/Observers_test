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
        <p>증빙자료는 최대 3개까지 가능합니다.</p>
        {datas?.map((data) => {
          return (
            <div>
              <img
                key={data.eviId}
                alt={'증빙자료' + data.eviId}
                src={data.img}
                style={{ width: '30%' }}
              />
              <CustomButton>디테일 페이지 이동</CustomButton>
            </div>
          );
        })}
        {datas.length < 3 && <CustomButton>증빙자료 추가</CustomButton>}
      </DialogContent>
    </Dialog>
  );
}
