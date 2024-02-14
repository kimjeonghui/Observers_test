import React, { useState, useRef, useEffect, useCallback } from 'react';
import Spreadsheet from 'react-spreadsheet';
import Button from '../global/Button';
import classnames from 'classnames';

const HEIGHT = 30;
const WIDTH = 96;

const CustomCell = ({
  column,
  row,
  setCellDimensions,
  select,
  activate,
  mode,
  dragging,
  active,
  data,
  evaluatedData,
  DataViewer,
  setCellData,
}) => {
  const rootRef = useRef(null);

  useEffect(() => {
    setCellDimensions(
      { row, column },
      {
        height: HEIGHT,
        width: WIDTH,
        left: WIDTH * (column + 1),
        top: HEIGHT * (row + 1),
      }
    );
  }, [setCellDimensions, column, row]);

  useEffect(() => {
    if (rootRef.current && active && mode === 'view') {
      rootRef.current.focus();
    }
  }, [rootRef, active, mode]);

  const handleMouseDown = useCallback(
    (event) => {
      if (mode === 'view') {
        if (event.shiftKey) {
          select({ row, column });
          return;
        }

        activate({ row, column });
      }
    },
    [select, activate, column, mode, row]
  );

  const handleMouseOver = useCallback(() => {
    if (dragging) {
      select({ row, column });
    }
  }, [dragging, select, column, row]);

  if (data && data.DataViewer) {
    ({ DataViewer, ...data } = data);
  }

  return (
    <td
      ref={rootRef}
      className={classnames(
        'Spreadsheet__cell',
        data && data.readOnly && 'Spreadsheet__cell--readonly',
        data && data.className
      )}
      style={{
        height: HEIGHT + 'px',
        width: WIDTH + 'px',
        fontSize: '12px',
      }}
      tabIndex={0}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
    >
      <DataViewer
        row={row}
        column={column}
        cell={data}
        evaluatedCell={evaluatedData}
        setCellData={setCellData}
      />
    </td>
  );
};

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
          Cell={CustomCell}
        />
      </div>
    </div>
  );
}
