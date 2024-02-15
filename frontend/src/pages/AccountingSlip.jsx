import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AdminApprovalTable from '../components/accoutingSlip/ApprovalTable';
import {
  SpanTab,
  ActiveSpanTab,
} from '../components/accoutingSlip/AccountingSlipStyles';
import AccountingSlipTable from '../components/accoutingSlip/AccountingSlipTable';

export default function AccountingSlip(props) {
  const [activeTab, setActiveTab] = useState(0);
  const tabMenus = ['결재 승인', '회계전표'];
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
      {activeTab === 0 && <AdminApprovalTable />}
      {activeTab === 1 && (
        <div>
          <AccountingSlipTable />
        </div>
      )}
    </div>
  );
}
