import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../api/officeConfig';
import AdminOfficeDialog from '../components/admin/AdminOfficeDialog';
import AdminOfficeModal from '../components/admin/AdminOfficeModal';
import AdminOfficeUpdate from '../components/admin/AdminOfficeUpdate';
import CustomButton from '../components/global/Button';
import ExcelIcon from '../assets/excel-logo-64.png';
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

export default function AdminOffice() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedOffice, setSelectedOffice] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //GET all
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(requests.GET_OFFICE_ALL())
      .then((response) => {
        const { data } = response;
        setTableData(data.referenceList);
        setFilteredData(data.referenceList); // Initialize filtered data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  //GET by ovsCd
  const handleChangeOffice = (event) => {
    const selectedOffice = event.target.value;
    setSelectedOffice(selectedOffice);

    if (selectedOffice === 'all') {
      // If '전체' (all) is selected, fetch all references
      fetchData();
    } else {
      // Fetch reference data for the selected office (선택한 사무실 보여줌)
      axios
        .get(requests.GET_OFFICE_LIST_BY_CODE(selectedOffice))
        .then((response) => {
          const { data } = response;
          setTableData([data.reference]);
          setFilteredData([data.reference]); // Update filtered data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setTableData([]);
        });
    }
  };

  //Open Insert Modal for AdminOfficeModal.jsx
  const handleOpenInsert = () => {
    setOpen(true);
  };

  //Data Mapping for AdminOfficeUpdate.jsx
  const [open2Map, setOpen2Map] = useState({});

  const handleOpenUpdate = (ovsCd) => {
    setOpen2Map((prevOpen2Map) => ({
      ...prevOpen2Map,
      [ovsCd]: true,
    }));
  };

  const handleCloseUpdate = (ovsCd) => {
    setOpen2Map((prevOpen2Map) => ({
      ...prevOpen2Map,
      [ovsCd]: false,
    }));
  };

  // Handle deletion confirmation
  const handleConfirmDelete = () => {
    if (deleteRow) {
      // Perform deletion
      axios
        .delete(requests.DELETE_OFFICE(deleteRow.ovsCd))
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
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - [].length) : 0;
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  return (
    <div style={{ padding: '10px 36px' }}>
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
            // fullWidth
          >
            <MenuItem value='all'>전체</MenuItem>
            {tableData.map((row) => (
              <MenuItem key={row.ovsCd} value={row.ovsCd}>
                {row.ovsMeaning}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} textAlign='right'>
          <CSVLink
            data={tableData}
            // headers={TableHead}
            style={{ decoration: 'none' }}
            filename='Posco_Oversea_Imprest.csv'
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
          {/* <AdminOfficeDialog /> */}
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
                    <TableCell>사무소코드</TableCell>
                    <TableCell>사무소이름</TableCell>
                    <TableCell>법인코드</TableCell>
                    <TableCell>장부통화</TableCell>
                    <TableCell>현지통화</TableCell>
                    <TableCell>현지통화2</TableCell>
                    <TableCell>송금통화</TableCell>
                    <TableCell>송금통화2</TableCell>
                    <TableCell>시작일</TableCell>
                    <TableCell>만료일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.ovsCd}</TableCell>
                        <TableCell>{row.ovsMeaning}</TableCell>
                        <TableCell>{row.ovsCopCd}</TableCell>
                        <TableCell>{row.glCurr}</TableCell>
                        <TableCell>{row.locCurr}</TableCell>
                        <TableCell>{row.locCurr2}</TableCell>
                        <TableCell>{row.transCurr}</TableCell>
                        <TableCell>{row.transCurr2}</TableCell>
                        <TableCell>{row.startDate}</TableCell>
                        <TableCell>{row.endDate}</TableCell>
                        <TableCell>
                          <AdminOfficeUpdate
                            open={open2Map[row.ovsCd] || false}
                            setOpen={(open) =>
                              setOpen2Map((prevOpen2Map) => ({
                                ...prevOpen2Map,
                                [row.ovsCd]: open,
                              }))
                            }
                            handleClose={() => handleCloseUpdate(row.ovsCd)}
                            ovsCd={row.ovsCd} // Ensure row.ovsCd is passed to AdminOfficeUpdate
                            fetchData={fetchData} // Pass fetchData function down to AdminOfficeModal
                          />
                          <EditIcon
                            onClick={() => handleOpenUpdate(row.ovsCd)}
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
              count={filteredData.length} // Use filteredData length
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
