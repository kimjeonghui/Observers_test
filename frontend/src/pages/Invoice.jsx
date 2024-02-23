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
  const [selectDate, setSelectDate] = useState(new Date());
  const tabMenus = ['당월 입력 조회', '엑셀 입력'];
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    getInvoiceData();
  }, [selectDate]);

  const getInvoiceData = () => {
    let ovsCd = user.ovsCd;
    let fiscalMonth = selectDate.getFullYear().toString() + '-';
    let month = selectDate.getMonth();
    if (month >= 9) {
      fiscalMonth += (selectDate.getMonth() + 1).toString();
    } else {
      fiscalMonth += '0' + (selectDate.getMonth() + 1).toString();
    }

    axios
      .get(requests.GET_IVOICE_LIST(ovsCd, fiscalMonth))
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.invoiceList;
          setInvoiceData(data);
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
    alert('계산해라~');
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
                    onClick={() => alert('결재요청했다~')}
                    size='sm'
                  >
                    결재요청
                  </CustomButton>
                ) : (
                  <CustomButton onClick={handleCalc} size='sm'>
                    외환차손익계산
                  </CustomButton>
                )}

                <CustomButton onClick={handleOpen} size='sm'>
                  입력
                </CustomButton>
              </div>
            </div>
          )}
          <InvoiceCalendar />
          <InvoiceTable
            rows={invoiceData}
            setEviData={setEviData}
            setEviModalOpen={setEviModalOpen}
          />
        </div>
      ) : (
        <InvoiceExcel />
      )}
    </div>
  );
}
