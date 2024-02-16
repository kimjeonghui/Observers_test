import React, { useState } from 'react';
import AdminCodeDialog from '../components/admin/AdminCodeDialog';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';

const rows = [
  {
    trans_cd: 1102,
    account_name: '판관비_경상연구개발비_복리후생비_산재보험료',
    account: '522141',
    subaccount: 1102,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '산재보험료',
  },
  {
    trans_cd: 1103,
    account_name: '판관비_경상연구개발비_복리후생비_국민연금',
    account: '522141',
    subaccount: 1103,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '국민연금',
  },
  {
    trans_cd: 1104,
    account_name: '판관비_경상연구개발비_복리후생비_고용보험료',
    account: '522141',
    subaccount: 1104,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '고용보험료',
  },
  {
    trans_cd: 1105,
    account_name: '판관비_경상연구개발비_복리후생비_부서별그룹활동지원',
    account: '522141',
    subaccount: 1105,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '부서별그룹활동지원',
  },
  {
    trans_cd: 1106,
    account_name: '판관비_경상연구개발비_복리후생비_직원중식비',
    account: '522141',
    subaccount: 1106,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '직원중식비',
  },
  {
    trans_cd: 1107,
    account_name: '판관비_경상연구개발비_복리후생비_체력단련비',
    account: '522141',
    subaccount: 1107,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '체력단련비충당금',
  },
  {
    trans_cd: 1109,
    account_name: '판관비_경상연구개발비_복리후생비_직능활동비',
    account: '522141',
    subaccount: 1109,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '직능활동비',
  },
  {
    trans_cd: 1110,
    account_name: '예수금_복리후생비_경영성과금',
    account: '210561',
    subaccount: 7503,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '경영성과금',
  },
  {
    trans_cd: 1116,
    account_name: '판관비_경상연구개발비_복리후생비_사택및공공시설지원',
    account: '522141',
    subaccount: 1116,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '사택및공공시설지원',
  },
  {
    trans_cd: 1118,
    account_name: '판관비_경상연구개발비_복리후생비_기념품지급',
    account: '522141',
    subaccount: 1118,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '기념품지급',
  },
  {
    trans_cd: 1120,
    account_name: '판관비_경상연구개발비_복리후생비_출퇴근지원',
    account: '522141',
    subaccount: 1120,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '출퇴근지원',
  },
  {
    trans_cd: 1123,
    account_name: '판관비_경상연구개발비_복리후생비_간담회지원',
    account: '522141',
    subaccount: 1123,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '간담회지원',
  },
  {
    trans_cd: 1125,
    account_name: '판관비_경상연구개발비_복리후생비_조직활성화경비',
    account: '522141',
    subaccount: 1125,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '조직활성화경비',
  },
  {
    trans_cd: 1128,
    account_name: '판관비_경상연구개발비_복리후생비_행사지원비',
    account: '522141',
    subaccount: 1128,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '행사,예식지원',
  },
  {
    trans_cd: 1199,
    account_name: '판관비_경상연구개발비_복리후생비_기타복리후생비',
    account: '522141',
    subaccount: 1199,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '복리후생비',
    major_ct: '기타복리후생비',
  },
  {
    trans_cd: 1201,
    account_name: '판관비_경상연구개발비_여비교통비_국내여비',
    account: '522141',
    subaccount: 1201,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '여비교통비',
    major_ct: '국내여비',
  },
  {
    trans_cd: 1202,
    account_name: '판관비_경상연구개발비_여비교통비_해외여비',
    account: '522141',
    subaccount: 1202,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '여비교통비',
    major_ct: '해외여비',
  },
  {
    trans_cd: 1205,
    account_name: '판관비_경상연구개발비_여비교통비_해외파견비',
    account: '522141',
    subaccount: 1205,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '여비교통비',
    major_ct: '해외파견비',
  },
  {
    trans_cd: 1301,
    account_name: '판관비_경상연구개발비_통신비_유선전화사용료',
    account: '522141',
    subaccount: 1301,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '통신비',
    major_ct: '유선전화사용료',
  },
  {
    trans_cd: 1302,
    account_name: '판관비_경상연구개발비_통신비_공용휴대폰운영비',
    account: '522141',
    subaccount: 1302,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '통신비',
    major_ct: '공용휴대폰운영비',
  },
  {
    trans_cd: 1303,
    account_name: '판관비_경상연구개발비_통신비_무선전화사용료',
    account: '522141',
    subaccount: 1302,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '통신비',
    major_ct: '휴대폰사용료지원비',
  },
  {
    trans_cd: 1304,
    account_name: '판관비_경상연구개발비_통신비_전용선사용료',
    account: '522141',
    subaccount: 1304,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '통신비',
    major_ct: '전용선사용료',
  },
  {
    trans_cd: 1305,
    account_name: '판관비_경상연구개발비_통신비_우편료',
    account: '522141',
    subaccount: 1305,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '통신비',
    major_ct: '우편료',
  },
  {
    trans_cd: 1399,
    account_name: '판관비_경상연구개발비_통신비_기타통신비',
    account: '522141',
    subaccount: 1399,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '통신비',
    major_ct: '기타통신비',
  },
  {
    trans_cd: 1401,
    account_name: '판관비_경상연구개발비_전력비_전력료',
    account: '522141',
    subaccount: 1401,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '전력용수비',
    major_ct: '전력료',
  },
  {
    trans_cd: 1402,
    account_name: '판관비_경상연구개발비_용수비_용수료',
    account: '522141',
    subaccount: 1501,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '전력용수비',
    major_ct: '용수료',
  },
  {
    trans_cd: 1499,
    account_name: '판관비_경상연구개발비_기타전력수도료',
    account: '522141',
    subaccount: 1501,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '전력용수비',
    major_ct: '기타전력수도료',
  },
  {
    trans_cd: 1501,
    account_name: '판관비_경상연구개발비_연료유지비_연료유지비',
    account: '522141',
    subaccount: 2301,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '연료유지비',
    major_ct: '연료유지비',
  },
  {
    trans_cd: 1699,
    account_name: '판관비_경상연구개발비_세금과공과_기타세금과공과',
    account: '522141',
    subaccount: 1699,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '세금과공과',
    major_ct: '기타세금과공과',
  },
  {
    trans_cd: 1701,
    account_name: '판관비_경상연구개발비_지급임차료_차량임차료',
    account: '522141',
    subaccount: 1701,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '지급임차료',
    major_ct: '차량,장비및기타기기',
  },
  {
    trans_cd: 1702,
    account_name: '판관비_경상연구개발비_지급임차료_사무실임차료',
    account: '522141',
    subaccount: 1702,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '지급임차료',
    major_ct: '사무실',
  },
  {
    trans_cd: 1703,
    account_name: '판관비_경상연구개발비_지급임차료_주택및숙소임차료',
    account: '522141',
    subaccount: 1703,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '지급임차료',
    major_ct: '주택및숙소',
  },
  {
    trans_cd: 1704,
    account_name: '판관비_경상연구개발비_지급임차료_전산기기S/W사용료',
    account: '522141',
    subaccount: 1704,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '지급임차료',
    major_ct: '전산기S/W사용료',
  },
  {
    trans_cd: 1799,
    account_name: '판관비_경상연구개발비_지급임차료_기타지급임차료',
    account: '522141',
    subaccount: 1799,
    deposit_cd: 1,
    dept_req_flag: 'Y',
    description: '경비',
    additional_comment: '지급임차료',
    major_ct: '기타지급임차료',
  },
  // ... (add more rows based on your provided data)
];

export default function AdminCode(props) {
  const [tableData, setTableData] = useState(rows);
  const [selectedCode, setSelectedCode] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangeCode = (event) => {
    const selectedValue = event.target.value;
    setSelectedCode(selectedValue);

    // 선택한 사무소에 따라 Filter rows
    if (selectedValue === 'all') {
      setTableData(rows); // Display all rows
    } else {
      const filteredRows = rows.filter((row) => row.account === selectedValue);
      setTableData(filteredRows);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        식별코드 관리
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            select
            label='계정명 검색'
            margin='dense'
            variant='standard'
            sx={{ width: '200px' }}
            value={selectedCode}
            onChange={handleChangeCode}
            //fullWidth
          >
            <MenuItem value='all'>전체</MenuItem>
            <MenuItem value='522141'>판관비</MenuItem>
            <MenuItem value='210561'>예수금</MenuItem>
            <MenuItem value='111121'>자산</MenuItem>
            <MenuItem value='900302'>미결재자산</MenuItem>
            <MenuItem value='429901'>수익</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} textAlign='right'>
          {/* <Button size='sm'>추가</Button> */}
          <AdminCodeDialog />
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>식별코드(TRAN_CD)</TableCell>
                    <TableCell>계정명(ACCOUNT_NAME)</TableCell>
                    <TableCell>계정코드(ACCOUNT)</TableCell>
                    <TableCell>보조계정(SUBACCOUNT)</TableCell>
                    <TableCell>입출금구분(DEPOSIT_CD)</TableCell>
                    <TableCell>부서코드필수여부(DEPT_REQ_FLAG)</TableCell>
                    <TableCell>대분류(MAJOR_CT)</TableCell>
                    <TableCell>중분류(MEDIUM_CT)</TableCell>
                    <TableCell>소분류(MINOR_CT)</TableCell>
                    <TableCell>적요설명(DESCRIPTION)</TableCell>
                    <TableCell>비고(ADDITIONAL_COMMENT)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.trans_cd}</TableCell>
                        <TableCell>{row.account_name}</TableCell>
                        <TableCell>{row.account}</TableCell>
                        <TableCell>{row.subaccount}</TableCell>
                        <TableCell>{row.deposit_cd}</TableCell>
                        <TableCell>{row.dept_req_flag}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.additional_comment}</TableCell>
                        <TableCell>{row.major_ct}</TableCell>
                        <TableCell>{row.medium_ct}</TableCell>
                        <TableCell>{row.minor_ct}</TableCell>
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
              count={rows.length}
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
