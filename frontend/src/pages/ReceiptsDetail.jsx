import React from 'react';
import { Box, Typography } from '@mui/material';
import receipt_img from '../assets/spain2.jpeg';
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
  createRow('MerchantAddress', 'C/SANTA MARIA DEL BLANCA, 32 41004 SEVILLA'),
  createRow('MerchantName', 'YIFAN HUANG S.L.'),
  createRow('MerchantPhoneNumber', '+34954220988'),
  createRow('Total', 33.8),
  createRow('TransactionDate', '2019-01-12'),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function ReceiptsMonth(props) {
  return (
    <Box
      sx={{
        display: 'flow',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      <Typography variant='h6' style={{ fontSize: '25px', marginLeft: '12px' }}>
        2023-10-03 14:23:11
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          // padding: '20px',
        }}
      >
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '500px', height: '600px', margin: '7px' }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.desc}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align='right'>{row.qty}</TableCell>
                  <TableCell align='right'>{row.unit}</TableCell>
                  <TableCell align='right'>{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align='right'>
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
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
      </Box>
    </Box>
  );
}

export default ReceiptsMonth;
