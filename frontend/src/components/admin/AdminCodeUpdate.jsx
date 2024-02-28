import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../../api/glcodeConfig';

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

function AdminCodeUpdate(props) {
  const Swal = require('sweetalert2');

  const { open, setOpen, glCodeId, fetchData } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const [referenceData, setReferenceData] = useState({}); // Initialize with an empty object

  useEffect(() => {
    if (open) {
      axios
        .get(requests.GET_GLCODE_BY_ID(glCodeId))
        .then((response) => {
          const { data } = response;
          // Update only specific properties of referenceData
          setReferenceData((prevData) => ({
            ...prevData,
            glCodeId: data.glCode.glCodeId,
            ovsCd: data.glCode.ovsCd,
            tranCd: data.glCode.tranCd,
            accountName: data.glCode.accountName,
            account: data.glCode.account,
            subAccount: data.glCode.subAccount,
            depositCd: data.glCode.depositCd,
            deptReqFlag: data.glCode.deptReqFlag,
            majorCt: data.glCode.majorCt,
            mediumCt: data.glCode.mediumCt,
            minorCt: data.glCode.minorCt,
            description: data.glCode.description,
            additionalComment: data.glCode.additionalComment,
            // Add other properties as needed
          }));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [open, glCodeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferenceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(requests.PUT_GLCODE_BY_ID(glCodeId), referenceData)
      .then((response) => {
        console.log(response.data);
        // alert('업데이트 되었습니다.');
        Swal.fire({
          title: '수정완료',
          text: '식별코드가 업데이트 되었습니다.',
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
        // alert('Error updating reference. Please try again.');
        Swal.fire({
          title: '수정실패',
          text: '모달 값을 전부 입력해주세요.',
          icon: 'error',
          customClass: {
            container: 'my-swal',
          },
        });
      });
  };

  const renderDialogContent = () => {
    return (
      <div>
        <DialogContent sx={{ padding: '36px 88px' }}>
          <FlexDiv>
            <ModalInput
              label='ID'
              name='glCodeId'
              value={referenceData.glCodeId}
              onChange={handleChange}
            />
            <ModalInput
              label='사무소코드'
              name='ovsCd'
              value={referenceData.ovsCd}
              onChange={handleChange}
            />
            <ModalInput
              label='식별코드'
              name='tranCd'
              value={referenceData.tranCd}
              onChange={handleChange}
            />
            <ModalInput
              label='계정명'
              name='accountName'
              value={referenceData.accountName}
              onChange={handleChange}
            />
          </FlexDiv>
          <FlexDiv>
            <ModalInput
              label='계정코드'
              name='account'
              value={referenceData.account}
              onChange={handleChange}
            />
            <ModalInput
              label='보조계정'
              name='subAccount'
              value={referenceData.subAccount}
              onChange={handleChange}
            />
            <ModalInput
              label='입출금구분'
              name='depositCd'
              value={referenceData.depositCd}
              onChange={handleChange}
            />
            <ModalInput
              label='부서코드필수여부'
              name='deptReqFlag'
              value={referenceData.deptReqFlag}
              onChange={handleChange}
            />
          </FlexDiv>
          <FlexDiv>
            <ModalInput
              label='대분류'
              value={referenceData.majorCt}
              name='majorCt'
              onChange={handleChange}
            />
            <ModalInput
              label='중분류'
              value={referenceData.mediumCt}
              name='mediumCt'
              onChange={handleChange}
            />
            <ModalInput
              label='소분류'
              value={referenceData.minorCt}
              name='minorCt'
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

export default AdminCodeUpdate;
