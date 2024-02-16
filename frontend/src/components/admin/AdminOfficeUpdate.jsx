import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function AdminOfficeModal(props) {
  const { open, setOpen, ovsCd } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/admin-office')
      .then((response) => {
        const { data } = response;
        setTableData(data.referenceList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const [referenceData, setReferenceData] = useState({}); // Initialize with an empty object

  useEffect(() => {
    if (open) {
      axios
        .get(`http://localhost:8080/admin-office/${ovsCd}`)
        .then((response) => {
          const { data } = response;
          // Update only specific properties of referenceData
          setReferenceData((prevData) => ({
            ...prevData,
            ovsCd: data.reference.ovsCd,
            ovsMeaning: data.reference.ovsMeaning,
            ovsCopCd: data.reference.ovsCopCd,
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
      .post(`http://localhost:8080/admin-office`, referenceData)
      .then((response) => {
        console.log(response.data);
        alert('업데이트 되었습니다.');
        setOpen(false);
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
              label='[기본]송금통화'
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

export default AdminOfficeModal;
