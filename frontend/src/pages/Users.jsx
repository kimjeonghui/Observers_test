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

export default function Users(props) {
  const [tableData, setTableData] = useState([]);

  const handleAddRow = () => {
    // Implement logic to add a new row to the table
    // You might want to fetch data from an API or add a dummy row
    // For now, let's add a dummy row with random data
    const newRow = Array.from(
      { length: 10 },
      (_, index) => `Data ${index + 1}`
    );
    setTableData((prevData) => [...prevData, newRow]);
  };

  return (
    <div>
      <AdminHeader />
      사용자 관리
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input widthV='20' heightV='5' label='Search' />
        </Grid>
        <Grid item xs={6} textAlign='right'>
          <Button size='sm' onClick={handleAddRow}>
            추가
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell>PASSWORD</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>OVS_CD</TableCell>
                    <TableCell>ROLE</TableCell>
                    <TableCell>START_DATE</TableCell>
                    <TableCell>END_DATE</TableCell>
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
