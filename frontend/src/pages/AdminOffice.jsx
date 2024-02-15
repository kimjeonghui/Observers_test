import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminOfficeDialog from '../components/admin/AdminOfficeDialog';
import AdminOfficeModal from '../components/admin/AdminOfficeModal';
import CustomButton from '../components/global/Button';
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
} from '@mui/material';

export default function AdminOffice() {
  const [tableData, setTableData] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/admin-office')
      .then((response) => {
        const { data } = response;
        setTableData(data.referenceList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChangeOffice = (event) => {
    const selectedOffice = event.target.value;
    setSelectedOffice(selectedOffice);

    if (selectedOffice === 'all') {
      // If '전체' (all) is selected, fetch all references
      fetchData();
    } else {
      // Fetch reference data for the selected office
      axios
        .get(`http://localhost:8080/admin-office/${selectedOffice}`)
        .then((response) => {
          const { data } = response;
          setTableData([data.reference]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setTableData([]);
        });
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - [].length) : 0;
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
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
          <AdminOfficeDialog />
          <AdminOfficeModal open={open} setOpen={setOpen} />
          <CustomButton onClick={handleOpen} size='sm'>
            입력
          </CustomButton>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>사무소코드(OVS_CD)</TableCell>
                    <TableCell>사무소이름(OVS_MEANING)</TableCell>
                    <TableCell>법인코드(OVS_COP_CD)</TableCell>
                    <TableCell>장부통화(GL_CURR)</TableCell>
                    <TableCell>현지통화(LOC_CURR)</TableCell>
                    <TableCell>현지통화(LOC_CURR2)</TableCell>
                    <TableCell>송금통화(TRANS_CURR)</TableCell>
                    <TableCell>송금통화(TRANS_CURR2)</TableCell>
                    <TableCell>시작일(START_DATE)</TableCell>
                    <TableCell>만료일(END_DATE)</TableCell>
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
                          <EditIcon />
                        </TableCell>
                        <TableCell>
                          <DeleteIcon />
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
    </div>
  );
}
