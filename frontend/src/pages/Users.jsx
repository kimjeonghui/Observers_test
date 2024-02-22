import React, { useEffect, useState } from 'react';

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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import UserRegisterModal from '../components/users/UserRegisterModal';
import UserUpdateModal from '../components/users/UserUpdateModal';
import Button from '../components/global/Button';
import Input from '../components/global/Input';
import OfficeSelector from '../components/global/OfficeSelector';
import axios from 'axios';

export default function Users(props) {
  const [tableData, setTableData] = useState([]);

  function createRow(
    name,
    description,
    email,
    ovsName,
    ovsCd,
    startDate,
    endDate,
    role
  ) {
    return {
      name,
      description,
      email,
      ovsName,
      ovsCd,
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
  const [ovsCd, setOvsCd] = useState('');
  const [registerOpen, setRegisterOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [user, setUser] = useState();
  const [ovsCdList, setovsCdList] = useState([]);
  const [getState, setGetState] = useState(false);
  const [deleteName, setDeleteName] = useState('');

  const handleDeleteClose = (event) => {
    setDeleteOpen(false);
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

  const handleDeleteDialog = (name) => {
    setDeleteName(name);
    setDeleteOpen(true);
  };

  const handleDeleteUser = () => {
    axios
      .delete(requests.DELETE_USER(deleteName))
      .then(() => {
        setGetState(!getState);
        setDeleteOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlegetUsers = () => {
    axios
      .get(requests.GET_USERS())
      .then((res) => {
        console.log(res);
        setTableData(res.data.userList);
        console.log(tableData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlegetByOvsCode = () => {
    axios
      .get(requests.GET_USERS_BY_OVSCD(ovsCd))
      .then((res) => {
        setTableData(res.data.userList);
        console.log(tableData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handlegetUsers();
    // handlegetOvsCode();
  }, []);

  useEffect(() => {
    handlegetUsers();
  }, [getState]);

  useEffect(() => {
    handlegetByOvsCode();
  }, [ovsCd]);

  return (
    <div style={{ padding: '10px 36px' }}>
      <UserRegisterModal
        open={registerOpen}
        setOpen={setRegisterOpen}
        getState={getState}
        setGetState={setGetState}
      />
      <UserUpdateModal
        open={updateOpen}
        setOpen={setUpdateOpen}
        getState={getState}
        setGetState={setGetState}
        user={user}
      />
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogContent>삭제하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteUser}>삭제</Button>
          <Button onClick={handleDeleteClose}>취소</Button>
        </DialogActions>
      </Dialog>
      <h2>사용자 관리</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input widthV='20' heightV='5' label='Search' />
        </Grid>
        <Grid item xs={6} textAlign='right'>
          <OfficeSelector curV={ovsCd} setCurV={setOvsCd} />
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
              {tableData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='center'>{row.description}</TableCell>
                  <TableCell align='center'>{row.email}</TableCell>
                  <TableCell align='center'>{row.ovsMeaning}</TableCell>
                  <TableCell align='center'>
                    {(row.startDate + '').substring(0, 10)}
                  </TableCell>
                  <TableCell align='center'>
                    {(row.endDate + '').substring(0, 10)}
                  </TableCell>
                  <TableCell align='center'>{row.role}</TableCell>
                  <TableCell align='center'>
                    <div onClick={() => handleUpdateOpen(row)}>
                      <EditIcon sx={{ cursor: 'pointer' }} />
                    </div>
                  </TableCell>
                  <TableCell align='center'>
                    <div onClick={() => handleDeleteDialog(row.name)}>
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
