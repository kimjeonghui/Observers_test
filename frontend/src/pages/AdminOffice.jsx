import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminOfficeDialog from '../components/admin/AdminOfficeDialog';
import Button from '../components/global/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';

const rows = [
  {
    ovs_cop_cd: 'OAM',
    ovs_cd: 'HDF13',
    ovs_meaning: '브뤼셀',
    loc_curr: 'USD',
    loc_curr2: 'EUR',
    trans_curr: 'USD',
    trans_curr2: 'EUR',
    gl_curr: 'USD',
    start_date: '2022-01-01',
    end_date: '',
  },
  {
    ovs_cop_cd: 'PH',
    ovs_cd: 'HDF32',
    ovs_meaning: '유럽',
    loc_curr: 'EUR',
    loc_curr2: 'EUR',
    trans_curr: 'USD',
    trans_curr2: 'KRW',
    gl_curr: 'USD',
    start_date: '2022-01-01',
    end_date: '',
  },
  {
    ovs_cop_cd: 'ENC',
    ovs_cd: 'HDF27',
    ovs_meaning: '아르헨티나',
    loc_curr: 'ARS',
    loc_curr2: 'EUR',
    trans_curr: 'USD',
    trans_curr2: 'EUR',
    gl_curr: 'USD',
    start_date: '2022-01-01',
    end_date: '',
  },
];

export default function AdminOffice(props) {
  const [tableData, setTableData] = useState(rows);
  const [selectedOffice, setSelectedOffice] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeOffice = (event) => {
    const selectedValue = event.target.value;
    setSelectedOffice(selectedValue);

    // 선택한 사무소에 따라 Filter rows
    if (selectedValue === 'all') {
      setTableData(rows); // Display all rows
    } else {
      const filteredRows = rows.filter((row) => row.ovs_cd === selectedValue);
      setTableData(filteredRows);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
      <AdminHeader />
      <Typography variant='h4' gutterBottom>
        사무소 관리
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            select
            label='사무소 검색'
            margin='dense'
            variant='standard'
            sx={{ width: '200px' }}
            value={selectedOffice}
            onChange={handleChangeOffice}
            //fullWidth
          >
            <MenuItem value='all'>전체</MenuItem>
            <MenuItem value='HDF13'>브뤼셀</MenuItem>
            <MenuItem value='HDF32'>유럽</MenuItem>
            <MenuItem value='HDF27'>아르헨티나</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} textAlign='right'>
          {/* <Button size='sm'>추가</Button> */}
          <AdminOfficeDialog />
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>법인코드(OVS_COP_CD)</TableCell>
                    <TableCell>사무소코드(OVS_CD)</TableCell>
                    <TableCell>사무소이름(OVS_MEANING)</TableCell>
                    <TableCell>현지통화(LOC_CURR)</TableCell>
                    <TableCell>현지통화(LOC_CURR2)</TableCell>
                    <TableCell>송금통화(TRANS_CURR)</TableCell>
                    <TableCell>송금통화(TRANS_CURR2)</TableCell>
                    <TableCell>장부통화(GL_CURR)</TableCell>
                    <TableCell>시작일(START_DATE)</TableCell>
                    <TableCell>만료일(END_DATE)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.ovs_cop_cd}</TableCell>
                        <TableCell>{row.ovs_cd}</TableCell>
                        <TableCell>{row.ovs_meaning}</TableCell>
                        <TableCell>{row.loc_curr}</TableCell>
                        <TableCell>{row.loc_curr2}</TableCell>
                        <TableCell>{row.trans_curr}</TableCell>
                        <TableCell>{row.trans_curr2}</TableCell>
                        <TableCell>{row.gl_curr}</TableCell>
                        <TableCell>{row.start_date}</TableCell>
                        <TableCell>{row.end_date}</TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 43 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
