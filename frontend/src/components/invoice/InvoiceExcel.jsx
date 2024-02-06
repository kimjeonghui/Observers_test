import React, { useState, useRef, useEffect, useCallback } from 'react';
import Spreadsheet from 'react-spreadsheet';
import Button from '../global/Button';
import classnames from 'classnames';

// // cell 클릭시 배경색깔 바뀌게 하는 코드

// const CustomCell = ({
//   column,
//   row,
//   setCellDimensions,
//   active,
//   data,
//   evaluatedData,
//   DataViewer,
//   setCellData,
// }) => {
//   // useRef를 사용하여 rootRef를 생성

//   const HEIGHT = '1em';
//   const WIDTH = '6em';
//   useEffect(() => {
//     setCellDimensions(
//       { row, column },
//       {
//         height: HEIGHT,
//         width: WIDTH,
//         left: WIDTH * (column + 1),
//         top: HEIGHT * (row + 1),
//       }
//     );
//   }, [setCellDimensions, column, row]);

//   if (data && data.DataViewer) {
//     ({ DataViewer, ...data } = data);
//   }

//   if (!data) {
//     // data가 없을 경우 빈 td 엘리먼트를 반환
//     return <td />;
//   }

//   const initialBackgroundColor = 'yellow';

//   return (
//     <td
//       className={classnames(
//         'Spreadsheet__cell',
//         data && data.readOnly && 'Spreadsheet__cell--readonly',
//         data && data.className
//       )}
//       style={{
//         backgroundColor: active
//           ? 'red'
//           : data.row === 0 || data.column === 0
//             ? 'blue'
//             : initialBackgroundColor,
//       }}
//       tabIndex={0}
//     >
//       <DataViewer
//         row={row}
//         column={column}
//         cell={data}
//         evaluatedCell={evaluatedData}
//         setCellData={setCellData}
//       />
//     </td>
//   );
// };

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

  const initialBackgroundColor = 'yellow';

  const initialData = data.map((row, rowIndex) =>
    row.map((cell, columnIndex) => ({
      ...cell,
      value: cell.value || '',
      style: {
        backgroundColor:
          rowIndex === 0 || columnIndex === 0 ? 'blue' : initialBackgroundColor,
      },
      row: rowIndex,
      column: columnIndex,
    }))
  );

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
        <Spreadsheet data={initialData} onChange={setData} />
      </div>
    </div>
  );
}
