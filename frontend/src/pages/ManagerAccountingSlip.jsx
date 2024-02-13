import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AccountingSlipTable from '../components/accoutingSlip/AfterConfirmAccountingSlipTable';
import ApprovalTable from '../components/accoutingSlip/ApprovalTable';
import {
  SpanTab,
  ActiveSpanTab,
} from '../components/accoutingSlip/AccountingSlipStyles';

export default function AccountingSlip(props) {
  const [activeTab, setActiveTab] = useState(0);
  const tabMenus = ['결재 승인', '회계전표'];

  const handleTabChange = (idx) => {
    setActiveTab(idx);
  };
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  // dateRange는 [startDate, endDate] 형태의 배열을 값 가짐
  const [dateRange, setDateRange] = useState([null, null]);
  //dateRange 변수를 startDate와 endDate 프로퍼티로 전달
  const [startDate, endDate] = dateRange;

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
      {activeTab === 0 && <ApprovalTable />}
      {activeTab === 1 && <AccountingSlipTable />}
    </div>
  );
}
