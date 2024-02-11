import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AdminAccountingSlipTable from '../components/accoutingSlip/AdminAccountingSlipTable';
import ApprovalTable from '../components/accoutingSlip/ApprovalTable';
import {
  SpanTab,
  ActiveSpanTab,
} from '../components/accoutingSlip/AccountingSlipStyles';

export default function AccountingSlip(props) {
  return (
    <div>
      <AdminAccountingSlipTable></AdminAccountingSlipTable>
    </div>
  );
}
