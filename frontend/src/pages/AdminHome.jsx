import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '../components/global/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminHeader from './AdminHeader';
import AdminHomeDialog from './AdminHomeDialog';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function AdminHome(props) {
  const [tableData, setTableData] = useState([]);

  return (
    <div>
      <AdminHeader />
      사무소 관리
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            select
            label='사무소 검색'
            margin='dense'
            fullWidth
            variant='standard'
          >
            <MenuItem value='HDF13'>브뤼셀</MenuItem>
            <MenuItem value='HDF32'>유럽</MenuItem>
            <MenuItem value='HDF27'>아르헨티나</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} textAlign='right'>
          <Button size='sm'>추가</Button>
          <AdminHomeDialog />
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>OVS_COP_CD</TableCell>
                    <TableCell>OVS_CD</TableCell>
                    <TableCell>OVS_MEANING</TableCell>
                    <TableCell>LOC_CURR</TableCell>
                    <TableCell>LOC_CURR2</TableCell>
                    <TableCell>TRANS_CURR</TableCell>
                    <TableCell>TRANS_CURR2</TableCell>
                    <TableCell>GL_CURR</TableCell>
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
