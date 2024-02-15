import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ModalStrokeBtn } from './InvoiceStyles';
import CustomButton from '../global/Button';
import Input from '../global/Input';
function InvoiceModal(props) {
  const { open, setOpen } = props;
  const [steps, setSteps] = useState(1);
  const [dep_curr, setDep_curr] = useState();
  const [wd_curr, setWd_curr] = useState();
  //Todo: 거래내역 입력창들에 대한 변동값 만들어줘야함

  const handleClose = () => {
    setSteps(1);
    setOpen(false);
  };

  const handleSteps = (step) => {
    setSteps(() => step + 1);
  };

  const handleDepChange = (e) => {
    setDep_curr(e.target.value);
  };
  const handleWdChange = (e) => {
    setWd_curr(e.target.value);
  };

  const handleOcrSubmit = () => {
    alert('submit 되었습니다. ocr api 연결해야해요');
    handleSteps(2);
    setTimeout(() => {
      handleSteps(3);
    }, 1000);
  };

  const renderDialogContent = () => {
    switch (steps) {
      case 1:
        return (
          <div>
            <DialogTitle>입력 방식을 선택해주세요.</DialogTitle>
            <DialogContent>
              <ModalStrokeBtn onClick={() => handleSteps(1)}>
                Manual
              </ModalStrokeBtn>
              <ModalStrokeBtn onClick={() => handleSteps(1)}>
                Photo
              </ModalStrokeBtn>
            </DialogContent>
          </div>
        );
      case 2:
        return (
          <div>
            <DialogContent>
              <ModalStrokeBtn>
                <input type='file' accept='image/png, image/jpeg' />
              </ModalStrokeBtn>
              <InputLabel id='dep_curr'>입금통화</InputLabel>
              <Select
                labelId='dep_curr'
                id='demo-simple-select'
                value={dep_curr}
                label='입금통화'
                onChange={handleDepChange}
              >
                <MenuItem value='ARS'>ARS</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
                <MenuItem value='KRW'>KRW</MenuItem>
              </Select>
              <InputLabel id='wd_curr'>출금통화</InputLabel>
              <Select
                labelId='wd_curr'
                id='demo-simple-select'
                value={wd_curr}
                label='출금통화'
                onChange={handleWdChange}
              >
                <MenuItem value='ARS'>ARS</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
                <MenuItem value='KRW'>KRW</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <CustomButton onClick={handleOcrSubmit}>제출하기</CustomButton>
            </DialogActions>
          </div>
        );
      case 3:
        return <div>분석중입니다.</div>;
      case 4:
        return (
          <div>
            <DialogContent>
              <Input
                widthV='30'
                heightV='5'
                label='거래처명'
                placeholder='거래처명을 입력하세요'
              />
              <Input
                widthV='10'
                heightV='5'
                label='식별코드'
                placeholder='거래처명을 입력하세요'
              />
              <br />
              <Select
                labelId='dep_curr'
                id='demo-simple-select'
                value={dep_curr}
                label='입금통화'
                onChange={handleDepChange}
              >
                <MenuItem value='ARS'>ARS</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
                <MenuItem value='KRW'>KRW</MenuItem>
              </Select>
              <Input
                widthV='10'
                heightV='5'
                label='입금금액'
                placeholder='입금금액을 입력하세요'
              />
              <Select
                labelId='dep_curr'
                id='demo-simple-select'
                value={wd_curr}
                label='출금통화'
                onChange={handleWdChange}
              >
                <MenuItem value='ARS'>ARS</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
                <MenuItem value='KRW'>KRW</MenuItem>
              </Select>
              <Input
                widthV='10'
                heightV='5'
                label='출금금액'
                placeholder='출금금액을 입력하세요'
              />

              <Input widthV='10' heightV='5' label='거래일자' type='date' />
              <br />
              <TextField
                sx={{ width: '30vw' }}
                id='standard-multiline-static'
                label='Multiline'
                multiline
                rows={4}
                defaultValue='Default Value'
                variant='standard'
              />
            </DialogContent>
          </div>
        );
      default:
        return <div>기본 내용</div>;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md'>
      {renderDialogContent()}
    </Dialog>
  );
}

export default InvoiceModal;
