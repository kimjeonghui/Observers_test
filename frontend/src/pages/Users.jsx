import React, { useState } from 'react';

import requests from '../api/config';

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
import { createSvgIcon } from '@mui/material/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UserRegisterModal from '../components/users/UserRegisterModal';

import axios from 'axios';

export default function Users(props) {
  const [tableData, setTableData] = useState([]);

  // const handleAddRow = () => {
  //   // Implement logic to add a new row to the table
  //   // You might want to fetch data from an API or add a dummy row
  //   // For now, let's add a dummy row with random data
  //   const newRow = Array.from(
  //     { length: 10 },
  //     (_, index) => `Data ${index + 1}`
  //   );
  //   setTableData((prevData) => [...prevData, newRow]);
  // };
  function createRow(name, desc, email, ovsName, startDate, endDate, role) {
    return { name, desc, email, ovsName, startDate, endDate, role };
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ovsCode, setOvsCode] = useState('');
  const [registerOpen, setRegisterOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleChange = (event) => {
    setOvsCode(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRegisterOpen = (event) => {
    setRegisterOpen(true);
  };

  const handleUpdateOpen = (event) => {
    setUpdateOpen(true);
  };

  const handleDeleteUser = (deleteName) => {
    axios
      .delete(requests.DELETE_USER('posco2'), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Baerer ' + requests.GET_TOKEN(),
        },
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <UserRegisterModal open={registerOpen} setOpen={setRegisterOpen} />
      <h2>사용자 관리</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input widthV='20' heightV='5' label='Search' />
        </Grid>
        <Grid item xs={6} textAlign='right'>
          {/* <FormControl>
            <InputLabel id='demo-simple-select-label'>사무소코드</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={ovsCode}
              label='Age'
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
          <FormControl sx={{ minWidth: 120 }} size='small'>
            <Typography
              my={1}
              sx={{
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
                fontWeight: 600,
              }}
            >
              사무소코드
            </Typography>
            <Select
              value={ovsCode}
              label=''
              onChange={handleChange}
              sx={{
                backgroundColor: '#F5F6FA',
                width: '20vw',
                maxWidth: '250px',
                marginRight: '2vw',
              }}
            >
              <MenuItem value='ARS'>ARS</MenuItem>
              <MenuItem value='USD'>USD</MenuItem>
              <MenuItem value='KRW'>KRW</MenuItem>
            </Select>
          </FormControl>
          <Button size='sm' onClick={handleRegisterOpen}>
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
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='center'>{row.desc}</TableCell>
                  <TableCell align='center'>{row.email}</TableCell>
                  <TableCell align='center'>{row.ovsName}</TableCell>
                  <TableCell align='center'>{row.startDate}</TableCell>
                  <TableCell align='center'>{row.endDate}</TableCell>
                  <TableCell align='center'>{row.role}</TableCell>
                  <TableCell align='center'>
                    <div onClick={handleRegisterOpen}>
                      <EditIcon />
                    </div>
                  </TableCell>
                  <TableCell align='center'>
                    <div onClick={() => handleDeleteUser(row.name)}>
                      <DeleteIcon />
                    </div>
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
    </div>
  );
}
