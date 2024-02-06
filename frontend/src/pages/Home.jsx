import React from 'react';

import { Bg } from '../components/global/GlobalStyles';
import CustomContainer from '../components/global/Container';
import { Routes, Route } from 'react-router-dom';
import Invoice from './Invoice';
import Ocr from './Ocr';
import Receipts from './Receipts';
import AccountingSlip from './AccountingSlip';
import AdminCode from './AdminCode';
import AdminOffice from './AdminOffice';
import ReceiptsMonth from './ReceiptsMonth';
import Users from './Users';

export default function Home(props) {
  return (
    <div>
      <Bg>
        <CustomContainer width='80' height='78'>
          <Routes>
            <Route path='/' element={<h1>Home Page</h1>} />
            <Route path='/invoice' element={<Invoice />} />
            <Route path='/receipts' element={<Receipts />} />
            <Route path='/receipts/:id' element={<ReceiptsMonth />} />
            <Route path='/ocr' element={<Ocr />} />
            <Route path='/accounting-slip' element={<AccountingSlip />} />
            <Route path='/admin-code' element={<AdminCode />} />
            <Route path='/admin-office' element={<AdminOffice />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </CustomContainer>
      </Bg>
    </div>
  );
}
