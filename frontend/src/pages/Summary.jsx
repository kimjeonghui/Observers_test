import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(topic, desc, qty, unit, usd, ars) {
  const price = priceRow(qty, unit);
  return { topic, desc, qty, unit, usd, ars };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('전월이월', ' ', ' ', ' ', 163046.23, 50822.96),
  createRow('자금수입', '가지급금', ' ', 'A204', ' ', ' '),
  createRow(' ', '전화가입권', ' ', 'A205', ' ', ' '),
  createRow(' ', '임차보증금', ' ', 'A206', ' ', ' '),
  createRow(' ', '영업보증금', ' ', 'A207', ' ', ' '),
  createRow(' ', '회원가입권', ' ', 'A208', ' ', ' '),
  createRow('인건비', '직원급여', '급여', 5201, ' ', ' '),
  createRow(' ', ' ', '상여', 5202, ' ', ' '),
  createRow(' ', ' ', '인센티브상여', 5203, ' ', ' '),
  createRow(' ', '제수당', '시간외 수당', 5501, ' ', ' '),
  createRow(' ', ' ', '연차 수당', 5502, ' ', ' '),
  createRow(' ', ' ', '월차 수당', 5503, ' ', ' '),
  createRow(' ', ' ', '고정성 수당', 5504, ' ', ' '),
  createRow(' ', ' ', '재외근무 수당', 5505, ' ', ' '),
  createRow(' ', ' ', '조정 수당', 5506, ' ', ' '),
  createRow(' ', ' ', '기타 수당', 5509, ' ', ' '),
  createRow(' ', '임원급여', '급여', 5301, ' ', ' '),
  createRow(' ', ' ', '상여', 5302, ' ', ' '),
  createRow(' ', ' ', '수당', 5103, ' ', ' '),
  createRow(' ', ' ', '인센티브상여', 5104, ' ', ' '),
  createRow(' ', '임시직급여', '현지인급여', 5404, ' ', ' '),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;
// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];
export default function Summary(props) {
  return (
    <div>
      <h2>월 총괄표</h2>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table sx={{ minWidth: 700 }} stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={1}>
                  구분
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  계정과목
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  적요
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  식별코드
                </TableCell>
                <TableCell align='right'>USD</TableCell>
                <TableCell align='right'>ARS</TableCell>
              </TableRow>
              {/* <TableRow>
            <TableCell>대분류</TableCell>
            <TableCell align='center'>중분류</TableCell>
            <TableCell align='center'>소분류</TableCell>
            <TableCell align='center'>Sum</TableCell>
          </TableRow> */}
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.topic}>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell align='center'>{row.desc}</TableCell>
                  <TableCell align='center'>{row.qty}</TableCell>
                  <TableCell align='center'>{row.unit}</TableCell>
                  <TableCell align='center'>{row.usd}</TableCell>
                  <TableCell align='center'>{row.ars}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
