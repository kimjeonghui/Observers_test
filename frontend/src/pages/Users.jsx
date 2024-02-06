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
import TablePagination from '@mui/material/TablePagination';
import AdminHeader from './AdminHeader';
import { createSvgIcon } from '@mui/material/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
  function createRow(topic, desc, qty, unit, usd, ars, role) {
    return { topic, desc, qty, unit, usd, ars, role };
  }
  const rows = [
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
    createRow(
      'PC123457',
      '포석호',
      'poseok@posco.com',
      'EU사무소',
      '2020-01-28',
      '2027-01-28',
      'Super User'
    ),
  ];
  const PlusIcon = createSvgIcon(
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='h-6 w-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 4.5v15m7.5-7.5h-15'
      />
    </svg>,
    'Plus'
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <AdminHeader />
      <h2>사용자 관리</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input widthV='20' heightV='5' label='Search' />
        </Grid>
        <Grid item xs={6} textAlign='right'>
          <Button size='sm' onClick={handleAddRow}>
            <PlusIcon color='white' />
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 530 }}>
          <Table sx={{ minWidth: 700 }} stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={1}>
                  사번
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  사원명
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  email
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  사무소
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  등록일
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  만료일
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  권한
                </TableCell>
                <TableCell align='right'> </TableCell>
                <TableCell align='right'> </TableCell>
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
                  <TableCell align='center'>{row.role}</TableCell>
                  <TableCell align='center'>
                    <EditIcon />
                  </TableCell>
                  <TableCell align='center'>
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <Grid container spacing={3} justifyContent='center' alignItems='center'>
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
      </Grid> */}
    </div>
  );
}
