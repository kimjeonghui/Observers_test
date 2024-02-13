import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ButtonComponent from '../global/Button';
import { Box } from '@mui/material';

const columns = [
  {
    id: 'ovs_cd',
    numeric: false,
    disablePadding: true,
    label: '사무소코드',
    minWidth: 120,
  },
  {
    id: 'num',
    numeric: true,
    disablePadding: false,
    label: '순번',
    minWidth: 100,
  },
  {
    id: 'fiscal_month',
    numeric: false,
    disablePadding: false,
    label: '회계월',
    minWidth: 120,
  },
  {
    id: 'tx_date',
    numeric: true,
    disablePadding: true,
    label: '거래일자',
    minWidth: 200,
  },
  {
    id: 'store',
    numeric: false,
    disablePadding: true,
    label: '거래처명',
    minWidth: 300,
  },
  {
    id: 'dep_curr',
    numeric: false,
    disablePadding: true,
    label: '입금통화',
    minWidth: 100,
  },
  {
    id: 'deposit',
    numeric: false,
    disablePadding: true,
    label: '입금금액',
    minWidth: 200,
  },
  {
    id: 'wd_curr',
    numeric: false,
    disablePadding: true,
    label: '출금통화',
    minWidth: 100,
  },
  {
    id: 'withdrawal',
    numeric: false,
    disablePadding: true,
    label: '출금금액',
    minWidth: 200,
  },
  {
    id: 'trans_cd',
    numeric: false,
    disablePadding: true,
    label: '식별코드',
    minWidth: 100,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: '거래내역',
    minWidth: 350,
  },
  {
    id: 'trans_amount',
    numeric: false,
    disablePadding: true,
    label: '환산금액',
    minWidth: 100,
  },
];

const rows = [
  {
    ovs_cd: 'HDF27',
    num: 1,
    fiscal_month: '23.12',
    tx_date: '2023.11.30',
    store: 'EFFECTIVO DEL MES ANTERIOR',
    dep_curr: null,
    deposit: null,
    wd_curr: 'ARS',
    withdrawal: 20312.47,
    trans_cd: 'Y010',
    description: 'EFFECTIVO DEL MES ANTERIOR',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 2,
    fiscal_month: '23.12',
    tx_date: '2023.12.27',
    store: 'YPF',
    dep_curr: null,
    deposit: null,
    wd_curr: 'ARS',
    withdrawal: 1190205.87,
    trans_cd: '1501',
    description: 'CONBUSTIBLE /LAVADO',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 3,
    fiscal_month: '23.12',
    tx_date: '2023.12.27',
    store: 'MACRO SECURITIES',
    dep_curr: 'ARS',
    deposit: 183290.06,
    wd_curr: 'USD',
    withdrawal: 1190205.87,
    trans_cd: 'X100',
    description: 'CAMBIO',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 4,
    fiscal_month: '23.12',
    tx_date: '2023.12.28',
    store: 'IMP.LEY25413',
    dep_curr: null,
    deposit: null,
    wd_curr: 'ARS',
    withdrawal: 2114.98,
    trans_cd: '1699',
    description: 'TAX',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 5,
    fiscal_month: '23.12',
    tx_date: '2023.12.27',
    store: 'LUMI PUNA',
    dep_curr: null,
    deposit: null,
    wd_curr: 'USD',
    withdrawal: 66046.66,
    trans_cd: '2505',
    description: 'CAMPAMENTO/CATERING',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 6,
    fiscal_month: '23.12',
    tx_date: '2023.12.13',
    store: 'IMP.LEY25413',
    dep_curr: null,
    deposit: null,
    wd_curr: 'USD',
    withdrawal: 10.73,
    trans_cd: '1699',
    description: 'TAX',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 7,
    fiscal_month: '23.12',
    tx_date: '2023.12.13',
    store: 'ESTUDIO HADAD',
    dep_curr: null,
    deposit: null,
    wd_curr: 'USD',
    withdrawal: 1788.67,
    trans_cd: '1699',
    description: 'TAX',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 8,
    fiscal_month: '23.12',
    tx_date: '2023.12.28',
    store: 'IMP.LEY25413',
    dep_curr: null,
    deposit: null,
    wd_curr: 'USD',
    withdrawal: 397.48,
    trans_cd: '1699',
    description: 'TAX',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 9,
    fiscal_month: '23.12',
    tx_date: '2023.12.27',
    store: 'DBCR 25413 S/DB TASAGRAL',
    dep_curr: null,
    deposit: null,
    wd_curr: 'ARS',
    withdrawal: 287.59,
    trans_cd: '1699',
    description: 'TAX',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 10,
    fiscal_month: '23.12',
    tx_date: '2023.12.27',
    store: 'TEF DATANET PGOS AFIP',
    dep_curr: null,
    deposit: null,
    wd_curr: 'ARS',
    withdrawal: 38187.18,
    trans_cd: '1699',
    description: 'TAX',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 11,
    fiscal_month: '23.12',
    tx_date: '2023.12.27',
    store: 'TEF DATANET PGOS AFIP',
    dep_curr: null,
    deposit: null,
    wd_curr: 'ARS',
    withdrawal: 9745.15,
    trans_cd: '1699',
    description: 'TAX',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 12,
    fiscal_month: '23.12',
    tx_date: '2023.12.23',
    store: 'LUMI PUNA',
    dep_curr: null,
    deposit: null,
    wd_curr: 'USD',
    withdrawal: 6604.02,
    trans_cd: '2505',
    description: 'CAMPAMENTO/CATERING',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 13,
    fiscal_month: '23.12',
    tx_date: '2023.12.17',
    store: 'MACRO SECURITIES',
    dep_curr: 'ARS',
    deposit: 183290.06,
    wd_curr: 'USD',
    withdrawal: 1190205.87,
    trans_cd: 'X100',
    description: 'CAMBIO',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 14,
    fiscal_month: '23.12',
    tx_date: '2023.12.20',
    store: 'YPF',
    dep_curr: null,
    deposit: null,
    wd_curr: 'ARS',
    withdrawal: 30205.87,
    trans_cd: '1501',
    description: 'CONBUSTIBLE /LAVADO',
    trans_amount: null,
  },
  {
    ovs_cd: 'HDF27',
    num: 15,
    fiscal_month: '23.12',
    tx_date: '2023.12.04',
    store: 'YPF',
    dep_curr: null,
    deposit: null,
    wd_curr: 'ARS',
    withdrawal: 9205.87,
    trans_cd: '1501',
    description: 'CONBUSTIBLE /LAVADO',
    trans_amount: null,
  },
];

export default function StickyHeadTable() {
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
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between', // 양 끝으로 정렬
          width: '300px', // 원하는 너비 설정
          margin: '0 auto', // 가운데 정렬을 위한 자동 마진
          marginTop: '20px', // 원하는 margin-top 값 설정
        }}
      >
        <ButtonComponent width='120px'>승인</ButtonComponent>
        <ButtonComponent width='120px'>반려</ButtonComponent>
      </div>
    </Box>
  );
}
