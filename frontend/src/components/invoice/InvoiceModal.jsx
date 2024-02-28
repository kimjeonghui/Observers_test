import React, { useState, useRef } from 'react';

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
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import { ModalStrokeBtn, FlexDiv } from './InvoiceStyles';
import CustomButton from '../global/Button';
import ModalInput from '../global/ModalInput';
import invoiceRq from '../../api/invoiceConfig';
import summaryRq from '../../api/summaryConfig';
import ocrRq from '../../api/ocrConfig';
import exchangeRq from '../../api/exchangeRateConfig';

export default function InvoiceModal(props) {
  const { open, setOpen, user, getInvoiceData } = props;
  const theme = useTheme();
  const Swal = require('sweetalert2');
  const [steps, setSteps] = useState(1);
  //form에서 받아야하는 데이터들
  const [txDate, setTxDate] = useState('');
  const [store, setStore] = useState('');
  const [depCurr, setDepCurr] = useState('');
  const [deposit, setDeposit] = useState('');
  const [wdCurr, setWdCurr] = useState('');
  const [withdrawal, setWithdrawal] = useState('');
  const [tranCd, setTranCd] = useState('');
  const [description, setDescription] = useState('');
  //ocr
  const [file, setFile] = useState(null);
  const openOcrRef = useRef();
  const [imgUrl, setImgUrl] = useState(null);

  // 모달 창 닫기 (500ms 뒤에 step 초기화)
  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setImgUrl(null);
    setTimeout(() => {
      handleSteps(0);
    }, 500);
  };

  // 모달을 렌더링할 때 필요한 step
  const handleSteps = (step) => {
    setSteps(() => step + 1);
  };

  //거래내역 입력창들에 대한 변동값

  const handleTxDateChange = (e) => {
    setTxDate(e.target.value);
  };

  const handleStoreChange = (e) => {
    setStore(e.target.value);
  };

  const handleDepChange = (e) => {
    setDepCurr(e.target.value);
  };

  const handleDepositChange = (e) => {
    setDeposit(e.target.value);
  };
  const handleWdChange = (e) => {
    setWdCurr(e.target.value);
  };

  const handleWithdrawalChange = (e) => {
    setWithdrawal(e.target.value);
  };

  const handleTranCdChange = (e) => {
    setTranCd(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const checkInvoiceForm = (obj) => {
    if (obj.txDate && obj.store && obj.tranCd && obj.description) {
      if ((obj.depCurr && obj.deposit) || (obj.wdCurr && obj.withdrawal)) {
        return true;
      } else {
        Swal.fire({
          title: '등록실패',
          text: '입금 통화(금액)이나 출금 통화(금액)를 입력하세요.',
          icon: 'error',
          customClass: {
            container: 'my-swal',
          },
        });
      }
    } else {
      Swal.fire({
        title: '등록실패',
        text: '필수값을 입력하세요.',
        icon: 'error',
        customClass: {
          container: 'my-swal',
        },
      });
    }
    return false;
  };
  // 거래 내용 제출하는 api
  const handleInvoiceSubmit = () => {
    const today = new Date();
    let fiscalMonth = today.getFullYear().toString() + '-';
    let month = today.getMonth();
    if (month >= 9) {
      fiscalMonth += (today.getMonth() + 1).toString();
    } else {
      fiscalMonth += '0' + (today.getMonth() + 1).toString();
    }

    // Todo:환율도 api로 불러와서 넣어주세요!
    const data = {
      ovsCd: user.ovsCd,
      fiscalMonth,
      txDate,
      store,
      depCurr,
      deposit,
      wdCurr,
      withdrawal,
      tranCd,
      description,
    };
    if (checkInvoiceForm(data)) {
      axios
        .post(invoiceRq.POST_INVOICE(), {
          ...data,
        })
        .then((response) => {
          if (response.status === 200) {
            getInvoiceData();
            handleClose();
          }
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(data);
      // axios
      //   .post(summaryRq.POST_SUMMARY(), {
      //     ...data,
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  };
  // 영수증 ocr로 넘기는 api
  const handleOcrUpload = () => {
    handleSteps(2);
    const formData = new FormData();
    formData.append('image', file);
    axios
      .post(ocrRq.POST_OCR_UPLOAD(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          divOcrResponse(response.data);
          handleSteps(3);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: '인식 실패',
          text: '필수값 인식에 실패하였습니다.',
          icon: 'error',
          customClass: {
            container: 'my-swal',
          },
        });
        handleClose();
        handleSteps(0);
      });
  };

  const divOcrResponse = (response) => {
    setTxDate(response.purDate);
    setStore(response.storeName);
    setWithdrawal(parseFloat(response.totalVal));
    const ocrId = response.ocrId;
  };

  // 증빙자료 넣을 때 파일가져오기 & 이미지 미리보기
  const handleFileChange = (e) => {
    setFile(e.target.files?.[0]);
    const imgFile = e.target.files?.[0];
    if (imgFile) {
      const tmpImgUrl = URL.createObjectURL(imgFile);
      setImgUrl(tmpImgUrl);
    }
  };

  // 모달창의 step
  const renderDialogContent = () => {
    switch (steps) {
      case 1:
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth='md'
          >
            <div style={{ boxSizing: 'border-box' }}>
              <DialogTitle>입력 방식을 선택해주세요.</DialogTitle>
              <DialogContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '36px 88px',
                  height: '60vh',
                }}
              >
                <ModalStrokeBtn
                  width='45%'
                  height='80%'
                  onClick={() => handleSteps(3)}
                >
                  <KeyboardAltOutlinedIcon
                    sx={{
                      color: theme.palette.posco_blue_500,
                      fontSize: { xs: '20vw', md: '8vw' },
                    }}
                  />
                  Manual
                </ModalStrokeBtn>
                <ModalStrokeBtn
                  width='45%'
                  height='80%'
                  onClick={() => handleSteps(1)}
                >
                  <AddAPhotoOutlinedIcon
                    sx={{
                      color: theme.palette.posco_blue_500,
                      fontSize: { xs: '20vw', md: '8vw' },
                    }}
                  />
                  Photo
                </ModalStrokeBtn>
              </DialogContent>
            </div>
          </Dialog>
        );
      case 2:
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth='sm'
          >
            <DialogContent
              sx={{
                padding: '36px 88px',
                height: '60vh',
              }}
            >
              <ModalStrokeBtn
                width='90%'
                height='90%'
                onClick={() => {
                  openOcrRef.current.click();
                }}
              >
                <input
                  ref={openOcrRef}
                  type='file'
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept='image/png, image/jpeg'
                />
                {imgUrl ? (
                  <img
                    style={{
                      width: '90%',
                      height: '90%',
                      objectFit: 'contain',
                    }}
                    src={imgUrl}
                    alt='upload-preview'
                  />
                ) : (
                  <AddAPhotoOutlinedIcon
                    sx={{
                      color: theme.palette.posco_blue_500,
                      fontSize: { xs: '20vw', sm: '15vw', md: '8vw' },
                    }}
                  />
                )}
              </ModalStrokeBtn>
            </DialogContent>
            <DialogActions>
              <CustomButton onClick={handleOcrUpload} size='sm'>
                영수증 입력하기
              </CustomButton>
            </DialogActions>
          </Dialog>
        );
      case 3:
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth='sm'
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                padding: '36px 88px',
                height: '60vh',
              }}
            >
              분석중입니다.
            </div>
          </Dialog>
        );
      case 4:
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth='lg'
          >
            <DialogContent
              sx={{
                padding: '36px 88px',
                height: '60vh',
              }}
            >
              <FlexDiv>
                <ModalInput
                  label='거래처명*'
                  value={store}
                  width='40vw'
                  placeholder='거래처명을 입력하세요'
                  onChange={handleStoreChange}
                />

                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <Typography
                    my={1}
                    sx={{
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      fontWeight: 600,
                    }}
                  >
                    식별코드*
                  </Typography>
                  <Select
                    value={tranCd}
                    onChange={handleTranCdChange}
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
                    value={depCurr}
                    onChange={handleDepChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value=''>None</MenuItem>
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
                  onChange={handleDepositChange}
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
                    value={wdCurr}
                    label=''
                    onChange={handleWdChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value=''>None</MenuItem>
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
                  value={withdrawal}
                  onChange={handleWithdrawalChange}
                />

                <ModalInput
                  type='date'
                  label='거래일자*'
                  value={txDate}
                  onChange={handleTxDateChange}
                />
              </FlexDiv>
              <div>
                <Typography
                  my={1}
                  sx={{
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    fontWeight: 600,
                  }}
                >
                  거래내역*
                </Typography>

                <TextField
                  sx={{ backgroundColor: '#F5F6FA' }}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder='거래내역을 입력하세요'
                  onChange={handleDescriptionChange}
                />
              </div>
              <Typography sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                * 필수값임.
              </Typography>
              <CustomButton size='md' onClick={handleInvoiceSubmit}>
                등록
              </CustomButton>
            </DialogContent>
          </Dialog>
        );
      default:
        return <div>{null}</div>;
    }
  };

  return <div>{renderDialogContent()}</div>;
}
