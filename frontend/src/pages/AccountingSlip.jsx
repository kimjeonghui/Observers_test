import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AccountingSlip(props) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  // dateRange는 [startDate, endDate] 형태의 배열을 값 가짐
  const [dateRange, setDateRange] = useState([null, null]);
  //dateRange 변수를 startDate와 endDate 프로퍼티로 전달
  const [startDate, endDate] = dateRange;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '300px',
          margin: '0 auto',
        }}
      >
        <button>앞</button>
        <div>{currentMonth}</div>
        <button>뒤</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          withPortal
        />
      </div>
    </div>
  );
}
