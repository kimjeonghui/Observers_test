import React from 'react';
import { Box, Typography } from '@mui/material';
import receipt_img from '../assets/spain2.jpeg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        }}
      >
        <img
          src={receipt_img}
          alt='img'
          style={{ width: '500px', height: '600px', margin: '7px' }}
        />
        <TableContainer sx={{ maxHeight: 720 }} component={Paper}>
          <Table aria-label='spanning table'>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                  MerchantAddress
                </TableCell>
                <TableCell align='right' colSpan={2}>
                  C/SANTA MARIA DEL BLANCA, 32 41004 SEVILLA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell rowSpan={5} />
                <TableCell colSpan={1} style={{ fontWeight: 'bold' }}>
                  HouseNumber
                </TableCell>
                <TableCell align='right'>32</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Road</TableCell>
                <TableCell align='right'>C/SANTA MARIA DEL BLANCA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>PostalCode</TableCell>
                <TableCell align='right'>41004</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>City</TableCell>
                <TableCell align='right'>SEVILLA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                  StreetAddress
                </TableCell>
                <TableCell align='right'>32 C/SANTA MARIA DEL BLANCA</TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                  MerchantName
                </TableCell>
                <TableCell align='right' colSpan={2}>
                  YIFAN HUANG S.L.
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                  MerchantPhoneNumber
                </TableCell>
                <TableCell align='right' colSpan={2}>
                  +34954220988
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Total</TableCell>
                <TableCell align='right' colSpan={2}>
                  33.8
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                  TransactionDate
                </TableCell>
                <TableCell align='right' colSpan={2}>
                  2019-01-12
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>1 Content</TableCell>
                <TableCell align='right' colSpan={2}>
                  2 MENU DE LA CASA 15,00 30,00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell rowSpan={4} />
                <TableCell style={{ fontWeight: 'bold' }}>
                  Description
                </TableCell>
                <TableCell align='right'>MENU DE LA CASA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align='right'>15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell align='right'>2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>TotalPrice</TableCell>
                <TableCell align='right'>30</TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>2 Content</TableCell>
                <TableCell align='right' colSpan={2}>
                  1 CERVEZA JAPONESA 3,80 3,80
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell rowSpan={4} />
                <TableCell style={{ fontWeight: 'bold' }}>
                  Description
                </TableCell>
                <TableCell align='right'>CERVEZA JAPONESA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align='right'>3.8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell align='right'>1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>TotalPrice</TableCell>
                <TableCell align='right'>3.8</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ReceiptsMonth;
