import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '../components/global/Button';
import Input from '../components/global/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminHeader from './AdminHeader';
import AdminCodeDialog from './AdminCodeDialog';

export default function AdminCode(props) {
  const [tableData, setTableData] = useState([]);

  return (
    <div>
      <AdminHeader />
      식별코드 관리
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input widthV='20' heightV='5' label='Search' />
        </Grid>
        <Grid item xs={6} textAlign='right'>
          <Button size='sm'>추가</Button>
          <AdminCodeDialog />
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>TRAN_CD</TableCell>
                    <TableCell>ACCOUNT_NAME</TableCell>
                    <TableCell>ACCOUNT</TableCell>
                    <TableCell>SUBACCOUNT</TableCell>
                    <TableCell>DEPOSIT_CD</TableCell>
                    <TableCell>DEPT_REQ_FLAG</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell>ADDITIONAL_COMMENT</TableCell>
                    <TableCell>MAJOR_CT</TableCell>
                    <TableCell>MEDIUM_CT</TableCell>
                    <TableCell>MINOR_CT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
