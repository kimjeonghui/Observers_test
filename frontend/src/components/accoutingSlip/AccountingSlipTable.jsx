import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import Button from '../global/Button';
import 'react-datepicker/dist/react-datepicker.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
  IconButton,
  Tooltip,
  TextField,
  // Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useTheme } from '@emotion/react';
import AccountingSlipSearch from './AccountingSlipSearch';
import ManagerRejectBtn from './ManagerRejectBtn';
import ManagerImportBtn from './ManagerImportBtn';

const rows = [
  {
    invoice_num: 'OAM-HDF32-202312-00001',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00001',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00001',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00002',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00002',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00002',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00003',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00003',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00003',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00004',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00004',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00004',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00005',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00005',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
  },
  {
    invoice_num: 'OAM-HDF32-202312-00005',
    drcr: 1,
    amount: '2,564.73EUR',
    krw_amount: '3,645,533.00',
    excange_rate: '1,421.41',
    cost_center: 'HDF32',
    account: '522011-1101',
    description: 'Participatio',
    created_by: 'PC000001',
    creation_date: '2024-12-02',
    group_id: 'OAM-202312-HDF32',
    tx_num: 3,
    tx_cd: 1202,
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
// 1111111
const headCells = [
  {
    id: 'invoice_num',
    numeric: false,
    disablePadding: true,
    label: 'INVOICE_NUM',
    minWidth: 230,
  },
  {
    id: 'drcr',
    numeric: false,
    disablePadding: false,
    label: '차대',
    minWidth: 80,
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: '금액',
    minWidth: 150,
  },
  {
    id: 'krw_amount',
    numeric: false,
    disablePadding: true,
    label: '원화금액',
    minWidth: 150,
  },
  {
    id: 'excange_rate',
    numeric: false,
    disablePadding: true,
    label: '환율',
    minWidth: 100,
  },
  {
    id: 'cost_center',
    numeric: false,
    disablePadding: true,
    label: '사무소',
    minWidth: 100,
  },
  {
    id: 'account',
    numeric: false,
    disablePadding: true,
    label: '계정코드',
    minWidth: 150,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: '설명',
    minWidth: 200,
  },
  {
    id: 'created_by',
    numeric: false,
    disablePadding: true,
    label: '생성자',
    minWidth: 150,
  },
  {
    id: 'creation_date',
    numeric: false,
    disablePadding: true,
    label: '생성날짜',
    minWidth: 150,
  },
  {
    id: 'group_id',
    numeric: false,
    disablePadding: true,
    label: '그룹아이디',
    minWidth: 180,
  },
  {
    id: 'tx_num',
    numeric: false,
    disablePadding: true,
    label: '거래순번',
    minWidth: 80,
  },
  {
    id: 'tx_cd',
    numeric: false,
    disablePadding: true,
    label: '식별코드',
    minWidth: 95,
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
    <TableHead
      stickyHeader
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <TableRow>
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
            {headCell.label}
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
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
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
const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

export default function AccountingSlipTable(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
  const groupedVisibleRows = groupBy(visibleRows, 'invoice_num');
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  // dateRange는 [startDate, endDate] 형태의 배열을 값 가짐
  const [dateRange, setDateRange] = useState([null, null]);
  //dateRange 변수를 startDate와 endDate 프로퍼티로 전달
  const [startDate, endDate] = dateRange;
  const theme = useTheme();

  const getMonthString = (monthNumber) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[monthNumber - 1];
  };
  const currentMonthString = getMonthString(currentMonth);
  const onClickPreBtn = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = (prevMonth - 1 + 12) % 12 || 12;
      if (newMonth === 12) {
        setYear((prevYear) => prevYear - 1);
      }
      return newMonth;
    });
  };

  const onClickNextBtn = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = (prevMonth + 1) % 12 || 12;
      if (newMonth === 1) {
        setYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between', // Aligns children to the start and end of the container
          gap: '8px',
          marginTop: '16px',
        }}
      >
        <Button
          onClick={onClickPreBtn}
          width='50px'
          color={theme.palette.posco_white}
          fontColor={theme.palette.posco_black}
          hoverColor={theme.palette.posco_gray_100}
        >
          <ChevronLeftIcon />
        </Button>
        <Typography sx={{ paddingX: '32px', fontSize: '28px' }}>
          {currentMonthString} , {year}
        </Typography>
        <Button
          onClick={onClickNextBtn}
          width='50px'
          color={theme.palette.posco_white}
          fontColor={theme.palette.posco_black}
          hoverColor={theme.palette.posco_gray_100}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div style={{ height: '20px' }} />
      <div />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginRight: ' auto',
        }}
      >
        <DatePicker
          showIcon
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          withPortal
          className='datepicker'
        />
        <AccountingSlipSearch />
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer sx={{ height: '60vh' }}>
          <Table>
            <TableHead
              stickyHeader
              aria-label='sticky table'
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              <Paper sx={{ width: '100%' }}>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
              </Paper>
            </TableHead>

            <TableBody>
              {Object.keys(groupedVisibleRows).map(
                (invoiceNumGroup, groupIndex) => {
                  return (
                    <React.Fragment key={`group-${groupIndex}`}>
                      <TableRow
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1fr', // 동일한 열 너비
                          alignItems: 'stretch', // 수직으로 컨테이너를 채우도록 아이템을 늘립니다.
                          cursor: 'pointer',
                          '&:hover': {
                            background: '#f5f5f5',
                          },
                        }}
                      >
                        {/* 그룹 선택하는 줄 */}
                        <TableCell
                          colSpan={headCells.length + 1}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center', // Change to 'center' for vertical alignment
                          }}
                        >
                          <Typography
                            variant='subtitle1'
                            component='div'
                            style={{ marginLeft: '8px' }}
                          >
                            {`${invoiceNumGroup} `} {/* 그룹 선택됨 */}
                          </Typography>
                        </TableCell>
                        {groupedVisibleRows[invoiceNumGroup].map(
                          (row, index) => (
                            <TableRow
                              key={row.tx_num}
                              tabIndex={-1}
                              sx={{ paddingTop: '3px', paddingBottom: '3px' }}
                            >
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align='center'
                                  style={{ minWidth: `${headCell.minWidth}px` }}
                                  sx={{
                                    fontSize: {
                                      xs: '12px',
                                      sm: '14px',
                                      md: '16px',
                                    },
                                    padding: 0,
                                  }}
                                >
                                  {row[headCell.id]}
                                </TableCell>
                              ))}
                            </TableRow>
                          )
                        )}
                      </TableRow>
                    </React.Fragment>
                  );
                }
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 43 * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* 유저 권한에 따라서 사무소장만 버튼 볼 수 있도록, 검증은 자동으로 하고 그 결과에 따라 렌더링 되는 버튼이 달라짐 */}
      <ManagerRejectBtn />
      <ManagerImportBtn />
    </Box>
  );
}
