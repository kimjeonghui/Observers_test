import React, { useState, useRef, useEffect } from 'react';
import Spreadsheet from 'react-spreadsheet';
import Button from '../global/Button';
import ExcelIcon from '../../assets/excel-logo-64.png';
import { CSVLink } from 'react-csv';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import * as XLSX from 'xlsx';
import axios from 'axios';

import requests from '../../api/invoiceConfig';
import summaryRq from '../../api/summaryConfig';

export default function InvoiceExcel(props) {
  const { user, getInvoiceData, setIsCalc } = props;
  const columnLabels = [
    '거래일자',
    '거래처명',
    '입금통화',
    '입금금액',
    '출금통화',
    '출금금액',
    '식별코드',
    '거래내역',
  ];
  const [data, setData] = useState([[], [], [], [], [], [], [], [], [], []]);
  const selectFile = useRef();
  // submit state
  const [excelData, setExcelData] = useState(null);
  const Swal = require('sweetalert2');
  useEffect(() => {
    tableImportData();
  }, [excelData]);

  const headers = [
    { label: '거래일자', key: 'txDate' },
    { label: '거래처명', key: 'store' },
    { label: '입금통화', key: 'depCurr' },
    { label: '입금금액', key: 'deposit' },
    { label: '출금통화', key: 'wdCurr' },
    { label: '출금금액', key: 'withdrawal' },
    { label: '식별코드', key: 'tranCd' },
    { label: '거래내역', key: 'description' },
  ];
  const sampleData = [
    {
      tx_date: 'YYYY-MM-DD',
      store: '',
      dep_curr: '',
      deposit: '',
      wd_curr: '',
      withdrawal: '',
      trans_cd: '',
      description: '',
    },
  ];

  // excel import 로직
  // import onchange event
  const handleFile = (e) => {
    let filetypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];

    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && filetypes.includes(selectedFile.type)) {
        let reader = new FileReader(selectedFile);

        reader.readAsArrayBuffer(selectedFile);

        reader.onload = (e) => {
          handleFileSubmit(e.target.result);
        };
      } else {
        alert('Please select only excel file types');
      }
    } else {
      alert('please select your file');
    }
  };

  // import event
  const handleFileSubmit = (excel) => {
    if (excel !== null) {
      const workbook = XLSX.read(excel, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const tmpData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(() => tmpData);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(
      date
    );

    let newDate = formattedDate.replace(/[.\s]+/g, '-');
    newDate = newDate.slice(0, -1);
    return newDate;
  };

  const tableImportData = () => {
    if (excelData !== null) {
      let tmpDataArr = [];
      for (let i = 0; i < excelData.length; i++) {
        let tmpArr = [];

        for (let j = 0; j < headers.length; j++) {
          const headerLabel = headers[j].label;

          if (headerLabel in excelData[i]) {
            let value = excelData[i][headerLabel];
            if (headerLabel === '거래일자') {
              value = new Date(
                value * 24 * 60 * 60 * 1000 + new Date(1899, 11, 30).getTime()
              );
              value = formatDate(value);
            }
            tmpArr.push({ value: value });
          } else {
            tmpArr.push({ value: '' });
          }
        }
        tmpDataArr.push(tmpArr);
      }
      setData(tmpDataArr);
    }
  };

  const addRow = () => {
    let tmpData = [...data];
    tmpData.push([{ value: '' }]);
    setData([...tmpData]);
  };

  // 시트에 있는 데이터 백으로 보내기 전 데이터 전처리
  const handlePreprocessingData = () => {
    let tmpData = [];
    const today = new Date();
    let fiscalMonth = today.getFullYear().toString() + '-';
    let month = today.getMonth();
    const ovsCd = user.ovsCd;
    if (month >= 9) {
      fiscalMonth += (today.getMonth() + 1).toString();
    } else {
      fiscalMonth += '0' + (today.getMonth() + 1).toString();
    }
    for (let i = 0; i < data.length; i++) {
      let tmpArr = {};

      for (let j = 0; j < data[i].length; j++) {
        let header = headers[j].key;
        let dataValue = data[i][j].value;
        tmpArr[header] = dataValue;
      }
      tmpArr.ovsCd = ovsCd;
      tmpArr.fiscalMonth = fiscalMonth;
      tmpData.push(tmpArr);
    }
    return tmpData;
  };

  const handleDataSubmit = () => {
    const newData = handlePreprocessingData();
    console.log(newData);
    // axios
    //   .post(requests.POST_INVOICE_LIST(), newData)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       Swal.fire({
    //         title: '등록성공',
    //         text: '거래 내역이 등록되었습니다.',
    //         icon: 'success',
    //         customClass: {
    //           container: 'my-swal',
    //         },
    //       });
    //       getInvoiceData();
    //       setIsCalc(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     Swal.fire({
    //       title: '등록실패',
    //       text: '거래 내역 등록에 실패하였습니다.',
    //       icon: 'error',
    //       customClass: {
    //         container: 'my-swal',
    //       },
    //     });
    //   });
    axios
      .post(summaryRq.POST_SUMMARY_LIST(), newData)

      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <CSVLink
            headers={headers}
            data={sampleData}
            style={{ decoration: 'none' }}
            filename='Posco_Oversea_Imprest_Example.csv'
          >
            <Button size='sm' color='#006736' hoverColor='#017940'>
              <img
                src={ExcelIcon}
                alt='excel icon'
                style={{ height: '60%', marginRight: '10px' }}
              />
              example
            </Button>
          </CSVLink>
          <input
            ref={selectFile}
            type='file'
            style={{ display: 'none' }}
            required
            onChange={handleFile}
          />
          <Button
            size='sm'
            onClick={() => {
              selectFile.current.click();
            }}
          >
            <LibraryAddIcon sx={{ mr: 1 }} />
            Add excel
          </Button>

          <Button
            onClick={() => {
              addRow();
            }}
            size='sm'
          >
            행 추가
          </Button>
        </div>
        <Button
          onClick={() => {
            handleDataSubmit();
          }}
          size='sm'
        >
          <SaveAltIcon sx={{ mr: 1 }} />
          저장
        </Button>
      </div>
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <Spreadsheet
          columnLabels={columnLabels}
          data={data}
          onChange={setData}
        />
      </div>
    </div>
  );
}
