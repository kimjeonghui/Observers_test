import React, { useState } from 'react';

import requests from '../api/userConfig';

import { Grid, Paper } from '@mui/material';
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
import UserUpdateModal from '../components/users/UserUpdateModal';
import Button from '../components/global/Button';
import Input from '../components/global/Input';
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
  function createRow(
    name,
    description,
    email,
    ovsName,
    ovsCode,
    startDate,
    endDate,
    role
  ) {
    return {
      name,
      description,
      email,
      ovsName,
      ovsCode,
      startDate,
      endDate,
      role,
    };
  }
  const rows = [
    createRow(
      'PC123457',
      '제갈석호',
      'poseok@posco.com',
      'EU사무소',
      'ARS',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123451',
      '남궁석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123452',
      '신석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123453',
      '인석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123454',
      '조석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123455',
      '정석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123456',
      '이석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123458',
      '박석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123459',
      '최석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123460',
      '김석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123450',
      '호석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123461',
      '포슥호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC123462',
      '포호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC1234563',
      '석호',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
    ),
    createRow(
      'PC1234565',
      '포석',
      'poseok@posco.com',
      'EU사무소',
      'HDB143',
      '2020-01-28',
      '2027-01-28',
      'USER'
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
  const [user, setUser] = useState();

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

  const handleUpdateOpen = (row) => {
    console.log(row.name);
    setUser(row);
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
      <UserUpdateModal open={updateOpen} setOpen={setUpdateOpen} user={user} />
      <h2>사용자 관리</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input widthV='20' heightV='5' label='Search' />
        </Grid>
        <Grid item xs={6} textAlign='right'>
          <FormControl sx={{ minWidth: 120 }} size='small'>
            <Typography
              my={1}
              sx={{
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
                fontWeight: 600,
                textAlign: 'left',
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
                textAlign: 'left',
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
                  시작일
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
                  <TableCell align='center'>{row.description}</TableCell>
                  <TableCell align='center'>{row.email}</TableCell>
                  <TableCell align='center'>{row.ovsName}</TableCell>
                  <TableCell align='center'>{row.startDate}</TableCell>
                  <TableCell align='center'>{row.endDate}</TableCell>
                  <TableCell align='center'>{row.role}</TableCell>
                  <TableCell align='center'>
                    <div onClick={() => handleUpdateOpen(row)}>
                      <EditIcon sx={{ cursor: 'pointer' }} />
                    </div>
                  </TableCell>
                  <TableCell align='center'>
                    <div onClick={() => handleDeleteUser(row.name)}>
                      <DeleteIcon sx={{ cursor: 'pointer' }} />
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
