import React, { useState } from 'react';
import InvoiceTable from '../components/invoice/InvoiceTable';
import InvoiceExcel from '../components/invoice/InvoiceExcel';
import { SpanTab, ActiveSpanTab } from '../components/invoice/InvoiceStyles';

import InvoiceSearch from '../components/invoice/InvoiceSearch';
import InvoiceCalendar from '../components/invoice/InvoiceCalendar';
import CustomButton from '../components/global/Button';
import InvoiceModal from '../components/invoice/InvoiceModal';
import InvoiceEviModal from '../components/invoice/InvoiceEviModal';
import ExcelIcon from '../assets/excel-logo-64.png';
import { CSVLink } from 'react-csv';
export default function Invoice(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [inputModalopen, setInputModalOpen] = useState(false);
  const [eviModalopen, setEviModalOpen] = useState(false);
  const [isCalc, setIsCalc] = useState(false);
  const [eviData, setEviData] = useState([]);
  const tabMenus = ['당월 입력 조회', '엑셀 입력'];

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

  const invoiceData = [
    {
      ovsCd: 'HDF27',
      id: 1,
      fiscalMonth: '23.12',
      txDate: '2023.11.30',
      store: 'EFFECTIVO DEL MES ANTERIOR',
      depCurr: null,
      deposit: null,
      wdCurr: 'ARS',
      withdrawal: 20312.47,
      transCd: 'Y010',
      description: 'EFFECTIVO DEL MES ANTERIOR',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 2,
      fiscalMonth: '23.12',
      txDate: '2023.12.27',
      store: 'YPF',
      depCurr: null,
      deposit: null,
      wdCurr: 'ARS',
      withdrawal: 1190205.87,
      transCd: '1501',
      description: 'CONBUSTIBLE /LAVADO',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 4,
      fiscalMonth: '23.12',
      txDate: '2023.12.27',
      store: 'MACRO SECURITIES',
      depCurr: 'ARS',
      deposit: 183290.06,
      wdCurr: 'USD',
      withdrawal: 1190205.87,
      transCd: 'X100',
      description: 'CAMBIO',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 5,
      fiscalMonth: '23.12',
      txDate: '2023.12.28',
      store: 'IMP.LEY25413',
      depCurr: null,
      deposit: null,
      wdCurr: 'ARS',
      withdrawal: 2114.98,
      transCd: '1699',
      description: 'TAX',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 6,
      fiscalMonth: '23.12',
      txDate: '2023.12.27',
      store: 'LUMI PUNA',
      depCurr: null,
      deposit: null,
      wdCurr: 'USD',
      withdrawal: 66046.66,
      transCd: '2505',
      description: 'CAMPAMENTO/CATERING',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 7,
      fiscalMonth: '23.12',
      txDate: '2023.12.13',
      store: 'IMP.LEY25413',
      depCurr: null,
      deposit: null,
      wdCurr: 'USD',
      withdrawal: 10.73,
      transCd: '1699',
      description: 'TAX',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 9,
      fiscalMonth: '23.12',
      txDate: '2023.12.13',
      store: 'ESTUDIO HADAD',
      depCurr: null,
      deposit: null,
      wdCurr: 'USD',
      withdrawal: 1788.67,
      transCd: '1699',
      description: 'TAX',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 10,
      fiscalMonth: '23.12',
      txDate: '2023.12.28',
      store: 'IMP.LEY25413',
      depCurr: null,
      deposit: null,
      wdCurr: 'USD',
      withdrawal: 397.48,
      transCd: '1699',
      description: 'TAX',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 11,
      fiscalMonth: '23.12',
      txDate: '2023.12.27',
      store: 'DBCR 25413 S/DB TASAGRAL',
      depCurr: null,
      deposit: null,
      wdCurr: 'ARS',
      withdrawal: 287.59,
      transCd: '1699',
      description: 'TAX',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 12,
      fiscalMonth: '23.12',
      txDate: '2023.12.27',
      store: 'TEF DATANET PGOS AFIP',
      depCurr: null,
      deposit: null,
      wdCurr: 'ARS',
      withdrawal: 38187.18,
      transCd: '1699',
      description: 'TAX',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 13,
      fiscalMonth: '23.12',
      txDate: '2023.12.27',
      store: 'TEF DATANET PGOS AFIP',
      depCurr: null,
      deposit: null,
      wdCurr: 'ARS',
      withdrawal: 9745.15,
      transCd: '1699',
      description: 'TAX',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 14,
      fiscalMonth: '23.12',
      txDate: '2023.12.23',
      store: 'LUMI PUNA',
      depCurr: null,
      deposit: null,
      wdCurr: 'USD',
      withdrawal: 6604.02,
      transCd: '2505',
      description: 'CAMPAMENTO/CATERING',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 15,
      fiscalMonth: '23.12',
      txDate: '2023.12.17',
      store: 'MACRO SECURITIES',
      depCurr: 'ARS',
      deposit: 183290.06,
      wdCurr: 'USD',
      withdrawal: 1190205.87,
      transCd: 'X100',
      description: 'CAMBIO',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 16,
      fiscalMonth: '23.12',
      txDate: '2023.12.20',
      store: 'YPF',
      depCurr: null,
      deposit: null,
      wdCurr: 'ARS',
      withdrawal: 30205.87,
      transCd: '1501',
      description: 'CONBUSTIBLE /LAVADO',
      transAmount: null,
      status: 'open',
    },
    {
      ovsCd: 'HDF27',
      id: 17,
      fiscalMonth: '23.12',
      txDate: '2023.12.04',
      store: 'YPF',
      depCurr: null,
      deposit: null,
      wdCurr: 'ARS',
      withdrawal: 9205.87,
      transCd: '1501',
      description: 'CONBUSTIBLE /LAVADO',
      transAmount: null,
      status: 'open',
    },
  ];
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
      <InvoiceModal open={inputModalopen} setOpen={setInputModalOpen} />
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
                <CustomButton onClick={() => alert('결재요청했다~')} size='sm'>
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
