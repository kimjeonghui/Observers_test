import React, { useState } from 'react';
import InvoiceTable from '../components/invoice/InvoiceTable';
import InvoiceExcel from '../components/invoice/InvoiceExcel';
import { SpanTab, ActiveSpanTab } from '../components/invoice/InvoiceStyles';

import InvoiceSearch from '../components/invoice/InvoiceSearch';
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
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
    {
      ovs_cd: 'HDF27',
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
      status: 'open',
    },
  ];
  const headers = [
    { label: '사무소코드', key: 'ovs_cd' },
    { label: '회계월', key: 'fiscal_month' },
    { label: '거래일자', key: 'tx_date' },
    { label: '거래처명', key: 'store' },
    { label: '입금통화', key: 'dep_curr' },
    { label: '입금금액', key: 'deposit' },
    { label: '출금통화', key: 'wd_curr' },
    { label: '출금금액', key: 'withdrawal' },
    { label: '식별코드', key: 'trans_cd' },
    { label: '거래내역', key: 'description' },
    { label: '환산금액', key: 'trans_amount' },
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
