import React, { useState } from 'react';
import InvoiceTable from '../components/invoice/InvoiceTable';
import InvoiceExcel from '../components/invoice/InvoiceExcel';
import { SpanTab, ActiveSpanTab } from '../components/invoice/InvoiceStyles';

import InvoiceSearch from '../components/invoice/InvoiceSearch';
export default function Invoice(props) {
  const [activeTab, setActiveTab] = useState(0);
  const tabMenus = ['당월 입력 조회', '엑셀 입력'];

  const handleTabChange = (idx) => {
    setActiveTab(idx);
  };
  return (
    <div style={{ padding: '10px 36px' }}>
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
          <InvoiceSearch />
          <InvoiceTable />
        </div>
      ) : (
        <InvoiceExcel />
      )}
    </div>
  );
}
