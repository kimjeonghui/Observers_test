import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApprovalTable from '../components/accoutingSlip/ApprovalTable';
import {
  SpanTab,
  ActiveSpanTab,
} from '../components/accoutingSlip/AccountingSlipStyles';
import AccountingSlipTable from '../components/accoutingSlip/AccountingSlipTable';
import requests from '../api/invoiceConfig';
import { userState } from '../state/UserState';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

export default function AccountingSlip(props) {
  const [activeTab, setActiveTab] = useState('회계전표');
  const [selectDate, setSelectDate] = useState(new Date());
  const [invoiceData, setInvoiceData] = useState([]);
  const user = useRecoilValue(userState);

  useEffect(() => {
    getInvoiceData();
  }, [selectDate]);
  const getInvoiceData = () => {
    let ovsCd = user.ovsCd;
    let fiscalMonth = selectDate.getFullYear().toString() + '-';
    let month = selectDate.getMonth();
    if (month >= 9) {
      fiscalMonth += (selectDate.getMonth() + 1).toString();
    } else {
      fiscalMonth += '0' + (selectDate.getMonth() + 1).toString();
    }

    axios
      .get(requests.GET_IVOICE_LIST(ovsCd, fiscalMonth))
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.invoiceList;
          setInvoiceData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let role = user.role;
  const tabMenus = [];
  console.log(role);
  if (role === 'SUPER_USER') {
    tabMenus.push('결재 승인');
  }

  tabMenus.push('회계전표');

  const handleTabChange = (idx) => {
    setActiveTab(tabMenus[idx]);
  };
  return (
    <div style={{ padding: '10px 36px' }}>
      <div>
        {tabMenus.map((tab, idx) =>
          tab === activeTab ? (
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
      {activeTab === '결재 승인' && <ApprovalTable />}
      {activeTab === '회계전표' && (
        <div>
          <AccountingSlipTable />
        </div>
      )}
    </div>
  );
}
