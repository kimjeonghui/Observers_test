import React, { useState } from 'react';
import InvoiceTable from '../components/invoice/InvoiceTable';
import InvoiceExcel from '../components/invoice/InvoiceExcel';
import { SpanTab, ActiveSpanTab } from '../components/invoice/InvoiceStyles';

import InvoiceSearch from '../components/invoice/InvoiceSearch';
import CustomButton from '../components/global/Button';
import InvoiceModal from '../components/invoice/InvoiceModal';
import InvoiceEviModal from '../components/invoice/InvoiceEviModal';
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
      num: 1,
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
      num: 2,
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
      num: 3,
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
      num: 4,
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
      num: 5,
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
      num: 6,
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
      num: 7,
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
      num: 8,
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
      num: 9,
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
      num: 10,
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
      num: 11,
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
      num: 12,
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
      num: 13,
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
      num: 14,
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
      num: 15,
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
