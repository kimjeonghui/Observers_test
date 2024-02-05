import React, { useState } from 'react';
import InvoiceTable from '../components/invoice/InvoiceTable';
import { SpanTab, ActiveSpanTab } from '../components/invoice/InvoiceStyles';

export default function Invoice(props) {
  const [activeTab, setActiveTab] = useState(0);
  const tabMenus = ['당월 입력 조회', '엑셀 입력'];

  const handleTabChange = (idx) => {
    setActiveTab(idx);
  };
  return (
    <div>
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
      {activeTab === 0 ? <InvoiceTable /> : <div>엑셀이요</div>}
    </div>
  );
}
