import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../../api/glcodeConfig';
import AdminOfficeModal from '../../components/admin/AdminOfficeModal';
import AdminCodeUpdate from './AdminCodeUpdate';
import CustomButton from '../../components/global/Button';
import ExcelIcon from '../../assets/excel-logo-64.png';
import { CSVLink } from 'react-csv';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  MenuItem,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@mui/material';

export default function AdminCodeTable() {
  const [tableData, setTableData] = useState([]);
  const [selectedMajorCt, setselectedMajorCt] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  //GET all
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(requests.GET_GLCODE_ALL())
      .then((response) => {
        const { data } = response;
        setTableData(data.glCodeList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  //GET by majorCt
  const handleChangeOffice = (event) => {
    const selectedMajorCt = event.target.value;
    setselectedMajorCt(selectedMajorCt);

    if (selectedMajorCt === 'all') {
      // If '전체' (all) is selected, fetch all glCode
      fetchData();
    } else {
      // Fetch glCodes data for the selected office (선택한 사무실 보여줌)
      axios
        .get(requests.GET_GLCODE_LIST_BY_MAJOR(selectedMajorCt))
        .then((response) => {
          const { data } = response;
          // setTableData([data.glCodes]);
          setTableData(data.glCodes);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          // setTableData([]);
        });
    }
  };

  //Open Insert Modal for AdminOfficeModal.jsx
  const handleOpenInsert = () => {
    setOpen(true);
  };

  //Data Mapping for AdminOfficeUpdate.jsx
  const [open2Map, setOpen2Map] = useState({});

  const handleOpenUpdate = (glCodeId) => {
    setOpen2Map((prevOpen2Map) => ({
      ...prevOpen2Map,
      [glCodeId]: true,
    }));
  };

  const handleCloseUpdate = (glCodeId) => {
    setOpen2Map((prevOpen2Map) => ({
      ...prevOpen2Map,
      [glCodeId]: false,
    }));
  };

  // Handle deletion confirmation
  const handleConfirmDelete = () => {
    if (deleteRow) {
      // Perform deletion
      axios
        .delete(requests.DELET_GLCODE_BY_ID(deleteRow.glCodeId))
        .then((response) => {
          console.log(response.data);
          fetchData(); // Refetch data after successful deletion
          setDeleteRow(null); // Reset deleteRow state
          setOpenDelete(false); // Close dialog
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
          // Handle deletion error
        });
    }
  };

  //Open Dialog for deletion confirmation
  const renderDeleteConfirmationDialog = () => (
    <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
      <DialogContent>정말로 삭제하시겠습니까?</DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmDelete}>삭제 강행</Button>
        <Button onClick={() => setOpenDelete(false)}>취소</Button>
      </DialogActions>
    </Dialog>
  );

  //Page Handling
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - [].length) : 0;

  return (
    <div style={{ padding: '10px 36px' }}>
      <Typography variant='h4' gutterBottom>
        식별코드관리
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            select
            label='대분류 검색'
            margin='dense'
            variant='standard'
            sx={{ width: '200px' }}
            value={selectedMajorCt}
            onChange={handleChangeOffice}
            // fullWidth
          >
            <MenuItem value='all'>전체</MenuItem>
            {tableData.map((row) => (
              <MenuItem key={row.majorCt} value={row.majorCt}>
                {row.majorCt}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} textAlign='right'>
          <CSVLink
            data={tableData}
            // headers={TableHead}
            style={{ decoration: 'none' }}
            filename='Posco_Oversea_Imprest_GL_CODE.csv'
          >
            <CustomButton size='sm' color='#006736' hoverColor='#017940'>
              <img
                src={ExcelIcon}
                alt='excel icon'
                style={{ height: '60%', marginRight: '10px' }}
              />
              export
            </CustomButton>
          </CSVLink>
          <AdminOfficeModal
            open={open}
            setOpen={setOpen}
            fetchData={fetchData} // Pass fetchData function down to AdminOfficeModal
          />
          <CustomButton onClick={handleOpenInsert} size='sm'>
            생성
          </CustomButton>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>사무소</TableCell>
                    <TableCell>식별코드</TableCell>
                    <TableCell>계정명</TableCell>
                    <TableCell>계정코드</TableCell>
                    <TableCell>보조계정</TableCell>
                    <TableCell>입출금구분</TableCell>
                    <TableCell>FLAG</TableCell>
                    <TableCell>대분류</TableCell>
                    <TableCell>중분류</TableCell>
                    <TableCell>소분류</TableCell>
                    <TableCell>설명</TableCell>
                    <TableCell>비고</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.glCodeId}</TableCell>
                        <TableCell>{row.ovsCd}</TableCell>
                        <TableCell>{row.tranCd}</TableCell>
                        <TableCell>{row.accountName}</TableCell>
                        <TableCell>{row.account}</TableCell>
                        <TableCell>{row.subAccount}</TableCell>
                        <TableCell>{row.depositCd}</TableCell>
                        <TableCell>{row.deptReqFlag}</TableCell>
                        <TableCell>{row.majorCt}</TableCell>
                        <TableCell>{row.mediumCt}</TableCell>
                        <TableCell>{row.minorCt}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.additionalComment}</TableCell>
                        <TableCell>
                          <AdminCodeUpdate
                            open={open2Map[row.glCodeId] || false}
                            setOpen={(open) =>
                              setOpen2Map((prevOpen2Map) => ({
                                ...prevOpen2Map,
                                [row.glCodeId]: open,
                              }))
                            }
                            handleClose={() => handleCloseUpdate(row.glCodeId)}
                            glCodeId={row.glCodeId} // Ensure row.ovsCd is passed to AdminOfficeUpdate
                            fetchData={fetchData} // Pass fetchData function down to AdminOfficeModal
                          />
                          <EditIcon
                            onClick={() => handleOpenUpdate(row.glCodeId)}
                          />
                        </TableCell>
                        <TableCell>
                          <DeleteIcon
                            onClick={() => {
                              setDeleteRow(row);
                              setOpenDelete(true);
                            }}
                          />
                        </TableCell>
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
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      {/* 어디에 추가하는게 맞는지 모르겠음 */}
      {renderDeleteConfirmationDialog()}
    </div>
  );
}
