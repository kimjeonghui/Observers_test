import React, { useState } from 'react';
import Spreadsheet from 'react-spreadsheet';
import Button from '../global/Button';

export default function InvoiceExcel(props) {
  const columnLabels = [
    '사무소코드',
    '순번',
    '회계월',
    '거래일자',
    '거래처명',
    '입금통화',
    '입금금액',
    '출금통화',
    '출금금액',
    '식별코드',
    '거래내역',
    '환산금액',
  ];
  const [data, setData] = useState([[], [], [], [], [], [], [], [], [], []]);

  const addColumn = () => {
    let tmpData = [...data];
    tmpData[0].push({ value: '' });
    setData([...tmpData]);
  };

  const addRow = () => {
    let tmpData = [...data];
    tmpData.push([{ value: '' }]);
    setData([...tmpData]);
  };

  return (
    <div>
      <Button
        onClick={() => {
          addColumn();
        }}
      >
        열 추가
      </Button>
      <Button
        onClick={() => {
          addRow();
        }}
      >
        행 추가
      </Button>
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <Spreadsheet
          columnLabels={columnLabels}
          data={data}
          onChange={setData}
        />
      </div>
    </div>
  );
}
