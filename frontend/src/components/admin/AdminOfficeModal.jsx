import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  MenuItem,
  Select,
  TextField,
  FormControl,
  Typography,
} from '@mui/material';
import { ModalStrokeBtn, FlexDiv } from './AdminStyles';
import CustomButton from '../global/Button';
import ModalInput from '../global/ModalInput';
import 'react-datepicker/dist/react-datepicker.css';

function AdminOfficeModal(props) {
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
            <DialogContent sx={{ display: 'flex' }}>
              <ModalStrokeBtn
                width='30%'
                height='30vh'
                onClick={() => handleSteps(3)}
              >
                Manual
              </ModalStrokeBtn>
              <ModalStrokeBtn
                width='30%'
                height='30vh'
                onClick={() => handleSteps(1)}
              >
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
              <FormControl sx={{ minWidth: 120 }} size='small'>
                <Typography
                  my={1}
                  sx={{
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    fontWeight: 600,
                  }}
                >
                  입금통화
                </Typography>
                <Select
                  labelId='dep_curr'
                  id='dep-curr-small'
                  value={dep_curr}
                  label=''
                  onChange={handleDepChange}
                  sx={{ backgroundColor: '#F5F6FA' }}
                >
                  <MenuItem value='ARS'>ARS</MenuItem>
                  <MenuItem value='USD'>USD</MenuItem>
                  <MenuItem value='KRW'>KRW</MenuItem>
                </Select>
              </FormControl>
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
            <DialogContent sx={{ padding: '36px 88px' }}>
              <FlexDiv>
                <ModalInput
                  label='거래처명'
                  width='40vw'
                  placeholder='거래처명을 입력하세요'
                />

                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <Typography
                    my={1}
                    sx={{
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      fontWeight: 600,
                    }}
                  >
                    식별코드
                  </Typography>
                  <Select
                    value={dep_curr}
                    label=''
                    onChange={handleDepChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value='1101'>1101</MenuItem>
                    <MenuItem value='1102'>1102</MenuItem>
                    <MenuItem value='1103'>1103</MenuItem>
                  </Select>
                </FormControl>
              </FlexDiv>
              <FlexDiv>
                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <Typography
                    my={1}
                    sx={{
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      fontWeight: 600,
                    }}
                  >
                    입금통화
                  </Typography>
                  <Select
                    value={dep_curr}
                    label=''
                    onChange={handleDepChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='KRW'>KRW</MenuItem>
                  </Select>
                </FormControl>

                <ModalInput
                  label='입금금액'
                  width='10vw'
                  placeholder='소수점 2자리포함'
                  type='number'
                />

                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <Typography
                    my={1}
                    sx={{
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      fontWeight: 600,
                    }}
                  >
                    출금통화
                  </Typography>
                  <Select
                    value={wd_curr}
                    label=''
                    onChange={handleDepChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='KRW'>KRW</MenuItem>
                  </Select>
                </FormControl>
                <ModalInput
                  label='출금금액'
                  width='10vw'
                  placeholder='소수점 2자리포함'
                  type='number'
                />

                <ModalInput type='date' label='거래일자' />
              </FlexDiv>
              <div>
                <Typography
                  my={1}
                  sx={{
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    fontWeight: 600,
                  }}
                >
                  거래내역
                </Typography>

                <TextField
                  sx={{ backgroundColor: '#F5F6FA' }}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder='거래내역을 입력하세요'
                />
              </div>
              <CustomButton size='md'>등록</CustomButton>
            </DialogContent>
          </div>
        );
      default:
        return <div>기본 내용</div>;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='lg'>
      {renderDialogContent()}
    </Dialog>
  );
}

export default AdminOfficeModal;
