import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../../api/officeConfig';

import {
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from '@mui/material';
import { FlexDiv } from './AdminStyles';
import CustomButton from '../global/Button';
import ModalInput from '../global/ModalInput';

function AdminOfficeUpdate(props) {
  const Swal = require('sweetalert2');

  const { open, setOpen, ovsCd, fetchData } = props;

  const handleClose = () => {
    setOpen(false);
  };

  // const [tableData, setTableData] = useState([]);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   axios
  //     .get(requests.GET_OFFICE_ALL())
  //     .then((response) => {
  //       const { data } = response;
  //       setTableData(data.referenceList);
  //     })
  //     .catch((error) => {
  //       console.error('Failed fetchData Error fetching data:', error);
  //     });
  // };

  const [referenceData, setReferenceData] = useState({}); // Initialize with an empty object

  useEffect(() => {
    if (open) {
      axios
        .get(requests.GET_OFFICE_LIST_BY_CODE(ovsCd))
        .then((response) => {
          const { data } = response;
          // Update only specific properties of referenceData
          setReferenceData((prevData) => ({
            ...prevData,
            ovsCd: data.reference.ovsCd,
            ovsMeaning: data.reference.ovsMeaning,
            ovsCopCd: data.reference.ovsCopCd,
            glCurr: data.reference.glCurr,
            locCurr: data.reference.locCurr,
            transCurr: data.reference.transCurr,
            locCurr2: data.reference.locCurr2,
            transCurr2: data.reference.transCurr2,
            startDate: data.reference.startDate,
            endDate: data.reference.endDate,
            // Add other properties as needed
          }));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [open, ovsCd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferenceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(requests.PUT_OFFICE(), referenceData)
      .then((response) => {
        console.log(response.data);
        // alert('업데이트 되었습니다.');
        Swal.fire({
          title: '수정완료',
          text: '사무소코드가 업데이트 되었습니다.',
          icon: 'success',
          customClass: {
            container: 'my-swal',
          },
        });
        setOpen(false);
        fetchData(); // Refresh data
      })
      .catch((error) => {
        console.error('Error updating reference:', error);
        alert('Error updating reference. Please try again.');
      });
  };

  const renderDialogContent = () => {
    return (
      <div>
        <DialogContent sx={{ padding: '36px 88px' }}>
          <FlexDiv>
            <ModalInput
              label='사무소코드'
              name='ovsCd'
              value={referenceData.ovsCd}
              onChange={handleChange}
            />
            <ModalInput
              label='사무소이름'
              name='ovsMeaning'
              value={referenceData.ovsMeaning}
              onChange={handleChange}
            />
            <ModalInput
              label='법인코드'
              name='ovsCopCd'
              value={referenceData.ovsCopCd}
              onChange={handleChange}
            />
            <ModalInput
              label='장부통화'
              name='glCurr'
              value={referenceData.glCurr}
              onChange={handleChange}
            />
          </FlexDiv>
          <FlexDiv>
            <ModalInput
              label='[기본]현지통화'
              name='locCurr'
              value={referenceData.locCurr}
              onChange={handleChange}
            />
            <ModalInput
              label='[기본]송금통화'
              name='transCurr'
              value={referenceData.transCurr}
              onChange={handleChange}
            />
            <ModalInput
              label='(추가)현지통화'
              name='locCurr2'
              value={referenceData.locCurr2}
              onChange={handleChange}
            />
            <ModalInput
              label='(추가)송금통화'
              name='transCurr2'
              value={referenceData.transCurr2}
              onChange={handleChange}
            />
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
            <CustomButton onClick={handleUpdate} size='md'>
              수정
            </CustomButton>
            <CustomButton onClick={handleClose} size='md'>
              취소
            </CustomButton>
          </FlexDiv>
        </DialogContent>
      </div>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='lg'>
      {renderDialogContent()}
    </Dialog>
  );
}

export default AdminOfficeUpdate;
