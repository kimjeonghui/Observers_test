import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../../api/officeConfig';

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
  const Swal = require('sweetalert2');

  const { open, setOpen, fetchData } = props;
  const [steps, setSteps] = useState(1);
  const handleClose = () => {
    setSteps(1);
    setOpen(false);
  };

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetchLOV();
  }, []);

  const fetchLOV = () => {
    axios
      .get(requests.GET_OFFICE_ALL())
      .then((response) => {
        const { data } = response;
        setTableData(data.referenceList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const [referenceData, setReferenceData] = useState({
    ovsCd: '',
    ovsMeaning: '',
    ovsCopCd: '',
    glCurr: '',
    locCurr: '',
    transCurr: '',
    locCurr2: '',
    transCurr2: '',
    startDate: '',
    endDate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferenceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOfficeSubmit = () => {
    const isExistingOvsCd = tableData.some(
      (row) => row.ovsCd === referenceData.ovsCd
    );

    if (isExistingOvsCd) {
      // alert('이미 존재하는 사무소 코드입니다.');
      Swal.fire({
        title: '실패',
        text: '사무소코드가 중복되었습니다.',
        icon: 'error',
        customClass: {
          container: 'my-swal',
        },
      });
      return; // Stop the function execution if ovsCd already exists
    }
    axios
      .post(requests.POST_OFFICE(), referenceData)
      .then((response) => {
        console.log(response.data); // Log response for debugging
        // alert('생성 되었습니다.'); // Alert user for successful creation
        Swal.fire({
          title: '생성완료',
          text: '사무소가 생성되었습니다.',
          icon: 'success',
          customClass: {
            container: 'my-swal',
          },
        });
        setReferenceData({
          // Reset referenceData state 생성 후 입력값 비우기
          ovsCd: '',
          ovsMeaning: '',
          ovsCopCd: '',
          glCurr: '',
          locCurr: '',
          transCurr: '',
          locCurr2: '',
          transCurr2: '',
          startDate: '',
          endDate: null,
        });
        handleClose(); // Close the modal after successful creation
        fetchData();
      })
      .catch((error) => {
        console.error('Error creating reference:', error);
        alert('Error creating reference. Please try again.'); // Alert user for any errors
      });
  };

  const renderDialogContent = () => {
    switch (steps) {
      case 1:
        return (
          <div>
            <DialogContent sx={{ padding: '36px 88px' }}>
              <FlexDiv>
                <ModalInput
                  label='사무소코드'
                  placeholder='ex.HDF###'
                  name='ovsCd'
                  value={referenceData.ovsCd}
                  onChange={handleChange}
                />
                <ModalInput
                  label='사무소이름'
                  placeholder='ex.아르헨티나'
                  name='ovsMeaning'
                  value={referenceData.ovsMeaning}
                  onChange={handleChange}
                />
                <ModalInput
                  label='법인코드'
                  placeholder='ex.PH'
                  name='ovsCopCd'
                  value={referenceData.ovsCopCd}
                  onChange={handleChange}
                />

                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <Typography
                    my={1}
                    sx={{
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      fontWeight: 600,
                    }}
                  >
                    장부통화
                  </Typography>
                  <Select
                    value={referenceData.glCurr}
                    name='glCurr'
                    onChange={handleChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    {/* {tableData.map((row) => (
                      <MenuItem key={row.locCurr} value={row.locCurr}>
                        {row.locCurr}
                      </MenuItem>
                      //Todo: 환율테이블에서 값을 가져와야 함
                    ))} */}
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='KRW'>KRW</MenuItem>
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
                    [기본]현지통화
                  </Typography>
                  <Select
                    value={referenceData.locCurr}
                    name='locCurr'
                    onChange={handleChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='CNY'>CNY</MenuItem>
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
                    [기본]송금통화
                  </Typography>
                  <Select
                    value={referenceData.transCurr}
                    name='transCurr'
                    onChange={handleChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='CNY'>CNY</MenuItem>
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
                    (추가)현지통화
                  </Typography>
                  <Select
                    value={referenceData.locCurr2}
                    name='locCurr2'
                    onChange={handleChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='CNY'>CNY</MenuItem>
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
                    (추가)송금통화
                  </Typography>
                  <Select
                    value={referenceData.transCurr2}
                    name='transCurr2'
                    onChange={handleChange}
                    sx={{ backgroundColor: '#F5F6FA' }}
                  >
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='ARS'>ARS</MenuItem>
                    <MenuItem value='CNY'>CNY</MenuItem>
                    <MenuItem value='KRW'>KRW</MenuItem>
                  </Select>
                </FormControl>
              </FlexDiv>
              <FlexDiv>
                <ModalInput
                  type='date'
                  label='시작일'
                  value={referenceData.startDate}
                  name='startDate'
                  onChange={handleChange}
                />
                <ModalInput
                  type='date'
                  label='만료일'
                  value={referenceData.endDate}
                  name='endDate'
                  onChange={handleChange}
                />
                <CustomButton onClick={handleOfficeSubmit} size='md'>
                  등록
                </CustomButton>
                <CustomButton onClick={handleClose} size='md'>
                  취소
                </CustomButton>
              </FlexDiv>
            </DialogContent>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='lg'>
      {renderDialogContent()}
    </Dialog>
  );
}

export default AdminOfficeModal;
