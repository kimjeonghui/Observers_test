import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/global/Button';
import { useTheme } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';
import axios from 'axios';

export default function Evidence(props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const dateButtons = [
    '2023-07',
    '2023-08',
    '2023-09',
    '2023-10',
    '2023-11',
    '2023-12',
    '2024-01',
    '2024-02',
  ];

  const handleButtonClick = (month) => {
    // 폴더 내부로 이동
    navigate(`/evidence/${month}`);

    // POST 호출
    const serverUrl = process.env.REACT_APP_OCR_SERVER_URL;
    axios
      .post(`${serverUrl}/${month}`)
      .then((response) => {
        // 3. Handle the response as needed
        console.log('POST request successful:', response.data);

        // Additional logic or UI updates based on the response can be added here
      })
      .catch((error) => {
        console.error('POST request failed:', error.message);
        // Handle errors or display a message to the user
      });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', gap: '20px', padding: '20px' }}>
        {dateButtons.map((date) => (
          <CustomButton
            key={date}
            color={theme.palette.posco_lg_300}
            fontColor={theme.palette.posco_gray_500}
            hoverColor={theme.palette.posco_gray_100}
            size='sm'
            onClick={() => handleButtonClick(date)}
          >
            <FolderIcon />
            <span style={{ marginLeft: '5px' }}>{date}</span>
          </CustomButton>
        ))}
      </Box>
    </div>
  );
}
