import React, { useMemo, useState } from 'react';

import Button from '../global/Button';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

const rows = [
  {
    ovs_cd: 'HDF27',
    num: 1,
    id: 1,
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
    id: 2,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'ovs_cd',
    numeric: false,
    disablePadding: true,
    label: '사무소코드',
    minWidth: 65,
    isSort: false,
  },
  {
    id: 'num',
    numeric: true,
    disablePadding: false,
    label: '순번',
    minWidth: 60,
    isSort: true,
  },
  {
    id: 'fiscal_month',
    numeric: false,
    disablePadding: false,
    label: '회계월',
    minWidth: 60,
    isSort: false,
  },
  {
    id: 'tx_date',
    numeric: true,
    disablePadding: true,
    label: '거래일자',
    minWidth: 70,
    isSort: true,
  },
  {
    id: 'store',
    numeric: false,
    disablePadding: true,
    label: '거래처명',
    minWidth: 150,
    isSort: true,
  },
  {
    id: 'dep_curr',
    numeric: false,
    disablePadding: true,
    label: '입금통화',
    minWidth: 80,
    isSort: true,
  },
  {
    id: 'deposit',
    numeric: false,
    disablePadding: true,
    label: '입금금액',
    minWidth: 80,
    isSort: true,
  },
  {
    id: 'wd_curr',
    numeric: false,
    disablePadding: true,
    label: '출금통화',
    minWidth: 80,
    isSort: true,
  },
  {
    id: 'withdrawal',
    numeric: false,
    disablePadding: true,
    label: '출금금액',
    minWidth: 80,
    isSort: true,
  },
  {
    id: 'trans_cd',
    numeric: false,
    disablePadding: true,
    label: '식별코드',
    minWidth: 60,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: '거래내역',
    minWidth: 120,
  },
  {
    id: 'trans_amount',
    numeric: false,
    disablePadding: true,
    label: '환산금액',
    minWidth: 80,
    isSort: true,
  },
  {
    id: 'sup_evidence',
    numeric: false,
    disablePadding: true,
    label: '증빙자료',
    minWidth: 80,
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: 4, padding: 0 }}>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            sx={{ width: '36px' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              minWidth: headCell.minWidth,
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              fontWeight: '600',
              padding: '0',
            }}
          >
            {headCell.isSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <div> {headCell.label}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
        minHeight: { xs: '42px' },
        height: { xs: '42px' },
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%', fontSize: '16px' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function InvoiceTable(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.num);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleEviModal = (id) => {
    alert(`증빙 모달 띄울거예요! 이 cell의 id는 ${id} 입니다!`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper sx={{ width: '100%', overflow: 'auto', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ height: '60vh' }}>
          <Table
            sx={{ minWidth: { xs: '90vw', sm: '80vw', md: '50vw' } }}
            stickyHeader
            aria-label='sticky table'
            size='small'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.num);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.num}>
                    <TableCell
                      sx={{ width: 4, padding: 0, boxSizing: 'border-box' }}
                    >
                      <Checkbox
                        color='primary'
                        onClick={() => handleClick(row.num)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        sx={{
                          fontSize: { xs: '12px', sm: '14px', md: '16px' },
                          padding: '0 4px',
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.ovs_cd}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.num}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.fiscal_month}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.tx_date}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.store}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.dep_curr}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.deposit}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.wd_curr}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.withdrawal}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.trans_cd}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.trans_amount}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      <Button
                        width='80px'
                        fontSize='13px'
                        onClick={() => {
                          handleEviModal(row.id);
                        }}
                      >
                        증빙 입력
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
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
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
