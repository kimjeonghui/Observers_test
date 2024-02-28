import React, { useEffect, useState } from 'react';
import InvoiceTable from '../components/invoice/InvoiceTable';
import InvoiceExcel from '../components/invoice/InvoiceExcel';
import { SpanTab, ActiveSpanTab } from '../components/invoice/InvoiceStyles';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

import InvoiceSearch from '../components/invoice/InvoiceSearch';
import InvoiceCalendar from '../components/invoice/InvoiceCalendar';
import CustomButton from '../components/global/Button';
import InvoiceModal from '../components/invoice/InvoiceModal';
import InvoiceEviModal from '../components/invoice/InvoiceEviModal';
import ExcelIcon from '../assets/excel-logo-64.png';
import { CSVLink } from 'react-csv';
import requests from '../api/invoiceConfig';
import { userState } from '../state/UserState';
export default function Invoice(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [inputModalopen, setInputModalOpen] = useState(false);
  const [eviModalopen, setEviModalOpen] = useState(false);
  const [isCalc, setIsCalc] = useState(false);
  const [eviData, setEviData] = useState([]);
  const tabMenus = ['당월 입력 조회', '엑셀 입력'];
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Swal = require('sweetalert2');

  const [year, setYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [fiscalMonth, setFiscalMonth] = useState();
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const user = useRecoilValue(userState);
  const ovsCd = user.ovsCd;
  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;
  useEffect(() => {
    getInvoiceData();
  }, [fiscalMonth]);

  useEffect(() => {
    handleFiscalMonth();
    if (year === todayYear && currentMonth === todayMonth) setIsActiveBtn(true);
    else setIsActiveBtn(false);
  }, [year, currentMonth]);

  const handleFiscalMonth = () => {
    if (currentMonth < 10) setFiscalMonth(year + '-0' + currentMonth);
    else setFiscalMonth(year + '-' + currentMonth);
  };

  const getInvoiceData = () => {
    handleFiscalMonth();
    axios
      .get(requests.GET_IVOICE_LIST(ovsCd, fiscalMonth))
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.invoiceList;
          setInvoiceData(data);
        } else if (response.status === 204) {
          setInvoiceData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const patchInvoiceData = () => {
    handleFiscalMonth();
    axios
      .patch(requests.PATCH_INVOICE_STATUS_DATA(ovsCd, fiscalMonth), {
        status: 'REQUESTED',
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: '결재요청 성공',
            text: '당월자료를 결재요청했습니다.',
            icon: 'success',
            customClass: {
              container: 'my-swal',
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTabChange = (idx) => {
    setActiveTab(idx);
  };
  const handleOpen = () => {
    setInputModalOpen(true);
  };
  const handleCalc = () => {
    Swal.fire({
      title: '외환차손익계산 완료',
      text: '외환차손익계산을 완료했습니다.',
      icon: 'success',
      customClass: {
        container: 'my-swal',
      },
    });
    setIsCalc(true);
  };

  const headers = [
    { label: '사무소코드', key: 'ovsCd' },
    { label: '회계월', key: 'fiscalMonth' },
    { label: '거래일자', key: 'txDate' },
    { label: '거래처명', key: 'store' },
    { label: '입금통화', key: 'depCurr' },
    { label: '입금금액', key: 'deposit' },
    { label: '출금통화', key: 'wdCurr' },
    { label: '출금금액', key: 'withdrawal' },
    { label: '식별코드', key: 'transCd' },
    { label: '거래내역', key: 'description' },
    { label: '환산금액', key: 'transAmount' },
  ];

  return (
    <div style={{ padding: '10px 36px' }}>
      <InvoiceModal
        open={inputModalopen}
        setOpen={setInputModalOpen}
        user={user}
        getInvoiceData={getInvoiceData}
      />
      <InvoiceEviModal
        open={eviModalopen}
        setOpen={setEviModalOpen}
        datas={eviData}
      />
      <div>
        {tabMenus.map((tab, idx) =>
          idx === activeTab ? (
            <ActiveSpanTab key={idx} onClick={() => handleTabChange(idx)}>
              {tab}
            </ActiveSpanTab>
          ) : (
            <SpanTab key={idx} onClick={() => handleTabChange(idx)}>
              {tab}
            </SpanTab>
          )
        )}
      </div>
      {activeTab === 0 ? (
        <div>
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <InvoiceSearch />
              <div>
                <CSVLink
                  data={invoiceData}
                  headers={headers}
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

                {isCalc ? (
                  <CustomButton
                    disabled={!isActiveBtn}
                    onClick={() => patchInvoiceData()}
                    size='sm'
                  >
                    결재요청
                  </CustomButton>
                ) : (
                  <CustomButton
                    disabled={!isActiveBtn}
                    onClick={handleCalc}
                    size='sm'
                  >
                    외환차손익계산
                  </CustomButton>
                )}

                <CustomButton onClick={handleOpen} size='sm'>
                  입력
                </CustomButton>
              </div>
            </div>
          )}
          <InvoiceCalendar
            year={year}
            setYear={setYear}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
          <InvoiceTable
            rows={invoiceData}
            setEviData={setEviData}
            setEviModalOpen={setEviModalOpen}
          />
        </div>
      ) : (
        <InvoiceExcel user={user} />
      )}
    </div>
  );
}
