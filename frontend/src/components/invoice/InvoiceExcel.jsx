import React, { useState } from 'react';
import Spreadsheet from 'react-spreadsheet';
import Button from '../global/Button';
export default function InvoiceExcel(props) {
  const [data, setData] = useState([
    [
      { value: '사무소코드', readOnly: true },
      { value: '순번', readOnly: true },
      { value: '회계월', readOnly: true },
      { value: '거래일자', readOnly: true },
      { value: '거래처명', readOnly: true },
      { value: '입금통화', readOnly: true },
      { value: '입금금액', readOnly: true },
      { value: '출금통화', readOnly: true },
      { value: '출금금액', readOnly: true },
      { value: '식별코드', readOnly: true },
      { value: '거래내역', readOnly: true },
      { value: '환산금액', readOnly: true },
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

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
        <Spreadsheet data={data} onChange={setData} />
      </div>
    </div>
  );
}
