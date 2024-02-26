import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

import Button from '../global/Button';
function DashboardCalender(props) {
  const { currentDate, year, setYear, currentMonth, setCurrentMonth } = props;

  // dateRange는 [startDate, endDate] 형태의 배열을 값 가짐
  const [dateRange, setDateRange] = useState([null, null]);
  //dateRange 변수를 startDate와 endDate 프로퍼티로 전달
  const [startDate, endDate] = dateRange;
  const theme = useTheme();

  const getMonthString = (monthNumber) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[monthNumber - 1];
  };
  const currentMonthString = getMonthString(currentMonth);
  const onClickPreBtn = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = (prevMonth - 1 + 12) % 12 || 12;
      if (newMonth === 12) {
        setYear((prevYear) => prevYear - 1);
      }
      return newMonth;
    });
  };

  const onClickNextBtn = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = (prevMonth + 1) % 12 || 12;
      if (newMonth === 1) {
        setYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };
  return (
    <div
      style={{
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Aligns children to the start and end of the container
        gap: '8px',
        margin: '0 auto',
      }}
    >
      <Button
        onClick={onClickPreBtn}
        width='50px'
        color={theme.palette.posco_white}
        fontColor={theme.palette.posco_black}
        hoverColor={theme.palette.posco_gray_100}
      >
        <ChevronLeftIcon />
      </Button>
      <Typography sx={{ paddingX: '32px', fontSize: '28px' }}>
        {currentMonthString} , {year}
      </Typography>
      <Button
        onClick={onClickNextBtn}
        width='50px'
        color={theme.palette.posco_white}
        fontColor={theme.palette.posco_black}
        hoverColor={theme.palette.posco_gray_100}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

export default DashboardCalender;
