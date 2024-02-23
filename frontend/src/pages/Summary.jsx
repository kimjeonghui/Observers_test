import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import OfficeSelector from '../components/global/OfficeSelector';
import SummaryCalendar from '../components/summary/SummaryCalendar';
import requests from '../api/summaryConfig';
import { userState } from '../state/UserState';
import axios from 'axios';
const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(topic, desc, qty, unit, usd, ars) {
  const price = priceRow(qty, unit);
  return { topic, desc, qty, unit, usd, ars };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('전월이월', ' ', ' ', ' ', 163046.23, 50822.96),
  createRow('자금수입', '가지급금', ' ', 'A204', ' ', ' '),
  createRow(' ', '전화가입권', ' ', 'A205', ' ', ' '),
  createRow(' ', '임차보증금', ' ', 'A206', ' ', ' '),
  createRow(' ', '영업보증금', ' ', 'A207', ' ', ' '),
  createRow(' ', '회원가입권', ' ', 'A208', ' ', ' '),
  createRow('인건비', '직원급여', '급여', 5201, ' ', ' '),
  createRow(' ', ' ', '상여', 5202, ' ', ' '),
  createRow(' ', ' ', '인센티브상여', 5203, ' ', ' '),
  createRow(' ', '제수당', '시간외 수당', 5501, ' ', ' '),
  createRow(' ', ' ', '연차 수당', 5502, ' ', ' '),
  createRow(' ', ' ', '월차 수당', 5503, ' ', ' '),
  createRow(' ', ' ', '고정성 수당', 5504, ' ', ' '),
  createRow(' ', ' ', '재외근무 수당', 5505, ' ', ' '),
  createRow(' ', ' ', '조정 수당', 5506, ' ', ' '),
  createRow(' ', ' ', '기타 수당', 5509, ' ', ' '),
  createRow(' ', '임원급여', '급여', 5301, ' ', ' '),
  createRow(' ', ' ', '상여', 5302, ' ', ' '),
  createRow(' ', ' ', '수당', 5103, ' ', ' '),
  createRow(' ', ' ', '인센티브상여', 5104, ' ', ' '),
  createRow(' ', '임시직급여', '현지인급여', 5404, ' ', ' '),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Summary(props) {
  const [ovsCd, setOvsCd] = useState();
  const [summary, setSummary] = useState();
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [fiscalMonth, setFiscalMonth] = useState(year + currentMonth);
  const user = useRecoilValue(userState);

  const handleGetSummary = () => {
    axios
      .get(requests.GET_SUMMARY(1, 111))
      .then((res) => {
        console.log(res);
        setSummary(res.data.summary);
        console.log(summary);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user.ovsCd) setOvsCd(user.ovsCd);
    handleGetSummary();
  }, []);
  return (
    <div style={{ padding: '10px 36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>월 총괄표</h2>
        <OfficeSelector curV={ovsCd} setCurV={setOvsCd} />
      </div>
      <SummaryCalendar
        currentDate={currentDate}
        year={year}
        setYear={setYear}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table sx={{ minWidth: 700 }} stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={1}>
                  구분
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  계정과목
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  적요
                </TableCell>
                <TableCell align='center' colSpan={1}>
                  식별코드
                </TableCell>
                <TableCell align='center'>{summary?.locCurr}</TableCell>
                <TableCell align='center'>{summary?.transCurr}</TableCell>
                <TableCell align='center'>비고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summary?.contents?.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell align='center'>{row.majorCt}</TableCell>
                  <TableCell align='center'>{row.mediumCt}</TableCell>
                  <TableCell align='center'>{row.minorCt}</TableCell>
                  <TableCell align='center'>{row.tranCd}</TableCell>
                  <TableCell align='center'>{row.loc}</TableCell>
                  <TableCell align='center'>{row.trans}</TableCell>
                  <TableCell align='center'>{row.note}</TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
