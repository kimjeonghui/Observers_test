import React from 'react';

import { Bg } from '../components/global/GlobalStyles';
import CustomContainer from '../components/global/Container';
import { Routes, Route } from 'react-router-dom';
import Invoice from './Invoice';
import Ocr from './Ocr';
import AccountingSlip from './AccountingSlip';
import AdminCode from './AdminCode';
import AdminHome from './AdminHome';
import Receipts from './Receipts';
import ReceiptsMonth from './ReceiptsMonth';
import ReceiptsDetail from './ReceiptsDetail';
import Users from './Users';
import Summary from './Summary';

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
            <Route path='/receipts/:id/:id' element={<ReceiptsDetail />} />
            <Route path='/ocr' element={<Ocr />} />
            <Route path='/accounting-slip' element={<AccountingSlip />} />
            <Route path='/admin-code' element={<AdminCode />} />
            <Route path='/admin-home' element={<AdminHome />} />
            <Route path='/users' element={<Users />} />
            <Route path='/summary' element={<Summary />} />
          </Routes>
        </CustomContainer>
      </Bg>
    </div>
  );
}
