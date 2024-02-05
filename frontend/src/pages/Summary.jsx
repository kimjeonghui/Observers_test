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

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('전월이월', ' ', ' '),
  createRow('자금수입', '가지급금', ' '),
  createRow('인건비', '직원급여', '급여'),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;
export default function Summary(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
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
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align='center'>{row.qty}</TableCell>
              <TableCell align='center'>{row.unit}</TableCell>
              <TableCell align='center'>{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align='right'>{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align='right'>{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align='right'>{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
