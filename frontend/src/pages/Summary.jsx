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
  const [fiscalMonth, setFiscalMonth] = useState('');
  const [curMajor, setCurMajor] = useState('');
  const [curMedium, setCurMedium] = useState('');
  const [curMinor, setCurMinor] = useState('');
  const user = useRecoilValue(userState);

  const handleGetSummary = () => {
    axios
      .get(requests.GET_SUMMARY(ovsCd, fiscalMonth))
      .then((res) => {
        console.log(res);
        setSummary(res.data.summary);
        console.log(summary);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFiscalMonth = () => {
    if (currentMonth < 10) setFiscalMonth(year + '-0' + currentMonth);
    else setFiscalMonth(year + '-' + currentMonth);

    console.log(fiscalMonth);
  };

  const handleMajor = (major) => {
    if (major === curMajor) return '';
    else {
      setCurMajor(major);
      return major;
    }
  };

  useEffect(() => {
    if (user.ovsCd) setOvsCd(user.ovsCd);
    // setYear();
    // setCurrentMonth(currentDate.getMonth() + 1);
    // handleFiscalMonth();
    // handleGetSummary();
  }, []);

  useEffect(() => {
    if (fiscalMonth.length === 7) handleGetSummary();
  }, [ovsCd, fiscalMonth]);

  useEffect(() => {
    handleFiscalMonth();
  }, [currentMonth]);

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
              {/* 분류 기준으로 정렬하고 이전이랑 같으면 안보이게 */}
              {summary?.contents
                ?.sort((a, b) => {
                  if (a.majorCt !== b.majorCt) {
                    return a.majorCt.localeCompare(b.majorCt);
                  } else if (a.mediumCt !== b.mediumCt) {
                    return a.mediumCt.localeCompare(b.mediumCt);
                  } else {
                    return a.minorCt.localeCompare(b.minorCt);
                  }
                })
                .map((row, idx, arr) => (
                  <TableRow key={idx}>
                    {arr[idx - 1]?.majorCt === row.majorCt ? (
                      <TableCell align='center'></TableCell>
                    ) : (
                      <TableCell align='center'>{row.majorCt}</TableCell>
                    )}
                    {arr[idx - 1]?.mediumCt === row.mediumCt ? (
                      <TableCell align='center'></TableCell>
                    ) : (
                      <TableCell align='center'>{row.mediumCt}</TableCell>
                    )}
                    {arr[idx - 1]?.minorCt === row.minorCt ? (
                      <TableCell align='center'></TableCell>
                    ) : (
                      <TableCell align='center'>{row.minorCt}</TableCell>
                    )}
                    <TableCell align='center'>{row.tranCd}</TableCell>
                    <TableCell align='center'>{row.loc}</TableCell>
                    <TableCell align='center'>{row.trans}</TableCell>
                    <TableCell align='center'>{row.note}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
