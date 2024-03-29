import React, { useEffect, useState } from 'react';
import {
  SpanTab,
  ActiveSpanTab,
} from '../components/dashboard/DashboardStyles';
import DashboardHome from '../components/dashboard/DashboardHome';
import DashboardOcr from '../components/dashboard/DashboardOcr';
import OfficeSelector from '../components/global/OfficeSelector';

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [ovsCd, setOvsCd] = useState();
  const tabMenus = ['HOME', 'OCR'];

  const handleTabChange = (idx) => {
    setActiveTab(idx);
  };

  return (
    <div style={{ padding: '10px 36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
        <OfficeSelector curV={ovsCd} setCurV={setOvsCd} />
      </div>

      <div>
        {activeTab === 0 ? <DashboardHome /> : null}
        {activeTab === 1 ? <DashboardOcr /> : null}
      </div>
    </div>
  );
}

export default Dashboard;
