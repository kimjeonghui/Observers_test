import React, { useState } from 'react';
import InvoiceTable from '../components/invoice/InvoiceTable';
import InvoiceExcel from '../components/invoice/InvoiceExcel';
import { SpanTab, ActiveSpanTab } from '../components/invoice/InvoiceStyles';

import InvoiceSearch from '../components/invoice/InvoiceSearch';
import CustomButton from '../components/global/Button';
import InvoiceModal from '../components/invoice/InvoiceModal';
export default function Invoice(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const tabMenus = ['당월 입력 조회', '엑셀 입력'];

  const handleTabChange = (idx) => {
    setActiveTab(idx);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div style={{ padding: '10px 36px' }}>
      <InvoiceModal open={open} setOpen={setOpen} />
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
            <CustomButton fontSize='12px' onClick={handleOpen}>
              입력
            </CustomButton>
          </div>
          <InvoiceTable />
        </div>
      ) : (
        <InvoiceExcel />
      )}
    </div>
  );
}
