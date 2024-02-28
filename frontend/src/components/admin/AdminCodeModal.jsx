import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../../api/glcodeConfig';

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

function AdminCodeModal(props) {
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
      .get(requests.GET_GLCODE_ALL())
      .then((response) => {
        const { data } = response;
        setTableData(data.referenceList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const [referenceData, setReferenceData] = useState({
    tranCd: '',
    accountName: '',
    account: '',
    subAccount: '',
    depositCd: '',
    deptReqFlag: '',
    majorCt: '',
    mediumCt: '',
    minorCt: '',
    description: '',
    additionalComment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferenceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   const handleOfficeSubmit = () => {
  //     const isExistingOvsCd = tableData.some(
  //       (row) => row.glCodeId === referenceData.glCodeId
  //     );

  //     if (isExistingOvsCd) {
  //       alert('이미 존재하는 사무소 코드입니다.');
  //       return; // Stop the function execution if glCodeId already exists
  //     }
  //     axios
  //       .post(requests.POST_GLCODE(), referenceData)
  //       .then((response) => {
  //         console.log(response.data); // Log response for debugging
  //         alert('생성 되었습니다.'); // Alert user for successful creation
  //         setReferenceData({
  //           // Reset referenceData state 생성 후 입력값 비우기

  //           tranCd: '',
  //           accountName: '',
  //           account: '',
  //           subAccount: '',
  //           depositCd: '',
  //           deptReqFlag: '',
  //           majorCt: '',
  //           mediumCt: '',
  //           minorCt: '',
  //           description: '',
  //           additionalComment: '',
  //         });
  //         handleClose(); // Close the modal after successful creation
  //         fetchData();
  //       })
  //       .catch((error) => {
  //         console.error('Error creating reference:', error);
  //         alert('Error creating reference. Please try again.'); // Alert user for any errors
  //       });
  //   };

  const handleOfficeSubmit = () => {
    axios
      .post(requests.POST_GLCODE(), referenceData)
      .then((response) => {
        console.log(response.data); // Log response for debugging
        alert('생성 되었습니다.'); // Alert user for successful creation
        setReferenceData({
          // Reset referenceData state 생성 후 입력값 비우기
          tranCd: '',
          accountName: '',
          account: '',
          subAccount: '',
          depositCd: '',
          deptReqFlag: '',
          majorCt: '',
          mediumCt: '',
          minorCt: '',
          description: '',
          additionalComment: '',
        });
        handleClose(); // Close the modal after successful creation
        fetchData();
      })
      .catch((error) => {
        console.error('Error creating reference:', error);
        if (error.response && error.response.data) {
          alert(error.response.data.message); // Alert user for any errors from the backend
        } else {
          alert('Error creating reference. Please try again.'); // Fallback error message
        }
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
                  label='식별코드'
                  placeholder='ex.1101'
                  name='tranCd'
                  value={referenceData.tranCd}
                  onChange={handleChange}
                />
                <ModalInput
                  label='계정명'
                  placeholder='ex.판관비'
                  name='accountName'
                  value={referenceData.accountName}
                  onChange={handleChange}
                />
                <ModalInput
                  label='계정코드'
                  placeholder='ex.522141'
                  name='account'
                  value={referenceData.account}
                  onChange={handleChange}
                />
                <ModalInput
                  label='보조계정'
                  placeholder='ex.1101'
                  name='subAccount'
                  value={referenceData.subAccount}
                  onChange={handleChange}
                />
              </FlexDiv>
              <FlexDiv>
                <ModalInput
                  label='입출금구분'
                  placeholder='ex.1'
                  name='depositCd'
                  value={referenceData.depositCd}
                  onChange={handleChange}
                />
                <ModalInput
                  label='부서코드필수여부'
                  placeholder='ex.Y'
                  name='deptReqFlag'
                  value={referenceData.deptReqFlag}
                  onChange={handleChange}
                />
                <ModalInput
                  label='적요설명'
                  value={referenceData.description}
                  name='description'
                  onChange={handleChange}
                />

                <ModalInput
                  label='비고'
                  value={referenceData.additionalComment}
                  name='additionalComment'
                  onChange={handleChange}
                />
              </FlexDiv>
              <FlexDiv>
                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <ModalInput
                    label='대분류'
                    placeholder='ex.경비'
                    value={referenceData.majorCt}
                    name='majorCt'
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <ModalInput
                    label='중분류'
                    placeholder='ex.복리후생비'
                    value={referenceData.mediumCt}
                    name='mediumCt'
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <ModalInput
                    label='소분류'
                    placeholder='ex.건강보험료'
                    value={referenceData.minorCt}
                    name='minorCt'
                    onChange={handleChange}
                  />
                </FormControl>
              </FlexDiv>

              <FlexDiv>
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

export default AdminCodeModal;
