import AdminCodeExcel from '../components/admin/AdminCodeExcel';
import AdminCodeTable from '../components/admin/AdminCodeTable';
import React, { useState } from 'react';
import {
  SpanTab,
  ActiveSpanTab,
} from '../components/dashboard/DashboardStyles';

function AdminCode() {
  const [activeTab, setActiveTab] = useState(0);
  const tabMenus = ['Table', 'Excel']; // Define your tab names here

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
      <div>
        {activeTab === 0 ? <AdminCodeTable /> : null}
        {activeTab === 1 ? <AdminCodeExcel /> : null}
      </div>
    </div>
  );
}

export default AdminCode;
