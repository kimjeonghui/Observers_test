import React, { useEffect, useMemo, useState } from 'react';

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
    id: 'ovsCd',
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
    isSort: false,
  },
  {
    id: 'fiscalMonth',
    numeric: false,
    disablePadding: false,
    label: '회계월',
    minWidth: 60,
    isSort: false,
  },
  {
    id: 'txDate',
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
    id: 'depCurr',
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
    id: 'wdCurr',
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
    id: 'tranCd',
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
    id: 'transAmount',
    numeric: false,
    disablePadding: true,
    label: '환산금액',
    minWidth: 80,
    isSort: true,
  },
  {
    id: 'supEvidence',
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
  const { rows, setEviData, setEviModalOpen } = props;
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
      const newSelected = rows?.map((row) => row.invoiceId);
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
    [order, orderBy, page, rowsPerPage, rows]
  );

  const eviDummy = [
    {
      invoiceId: 1,
      data: [
        {
          eviId: 1,
          img: 'https://img000c.feelway.com/201007/ask-07211110240z.jpg',
        },
        {
          eviId: 2,
          img: 'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1mJ8/image/-CxT8sL_BR60CAf9r8OhJxSCk6o.jpg',
        },
        {
          eviId: 3,
          img: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202011/24/d0874f8a-2b7b-4451-9cb3-f053045c98e3.jpg',
        },
      ],
    },
    {
      invoiceId: 4,
      data: [
        {
          eviId: 4,
          img: 'https://img000c.feelway.com/201007/ask-07211110240z.jpg',
        },
      ],
    },
    {
      invoiceId: 5,
      data: [
        {
          eviId: 5,
          img: 'https://img000c.feelway.com/201007/ask-07211110240z.jpg',
        },
        {
          eviId: 6,
          img: 'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1mJ8/image/-CxT8sL_BR60CAf9r8OhJxSCk6o.jpg',
        },
      ],
    },
    {
      invoiceId: 9,
      data: [
        {
          eviId: 7,
          img: 'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1mJ8/image/-CxT8sL_BR60CAf9r8OhJxSCk6o.jpg',
        },
        {
          eviId: 8,
          img: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202011/24/d0874f8a-2b7b-4451-9cb3-f053045c98e3.jpg',
        },
      ],
    },
    {
      invoiceId: 11,
      data: [
        {
          eviId: 1,
          img: 'https://img000c.feelway.com/201007/ask-07211110240z.jpg',
        },
        {
          eviId: 2,
          img: 'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1mJ8/image/-CxT8sL_BR60CAf9r8OhJxSCk6o.jpg',
        },
        {
          eviId: 3,
          img: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202011/24/d0874f8a-2b7b-4451-9cb3-f053045c98e3.jpg',
        },
      ],
    },
    {
      invoiceId: 12,
      data: [
        {
          eviId: 1,
          img: 'https://img000c.feelway.com/201007/ask-07211110240z.jpg',
        },
        {
          eviId: 2,
          img: 'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1mJ8/image/-CxT8sL_BR60CAf9r8OhJxSCk6o.jpg',
        },
        {
          eviId: 3,
          img: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202011/24/d0874f8a-2b7b-4451-9cb3-f053045c98e3.jpg',
        },
      ],
    },
  ];

  const handleEviModal = (id) => {
    //id를 바탕으로 API 호출해야함. 더미로 로직만 짜는 중

    let flag = false;
    for (let i = 0; i < eviDummy.length; i++) {
      let evi = eviDummy[i];
      if (evi.id === id) {
        setEviData(evi.data);
        flag = true;
        break;
      }
    }
    if (!flag) {
      setEviData([]);
    }
    setEviModalOpen(true);
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
                const isItemSelected = isSelected(row.invoiceId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.invoiceId}>
                    <TableCell
                      sx={{ width: 4, padding: 0, boxSizing: 'border-box' }}
                    >
                      <Checkbox
                        color='primary'
                        onClick={() => handleClick(row.id)}
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
                      {row.ovsCd}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.fiscalMonth}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        padding: 0,
                      }}
                    >
                      {row.txDate}
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
                      {row.depCurr}
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
                      {row.wdCurr}
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
                      {row.tranCd}
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
                      {row.transAmount}
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
                        증빙 조회
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
