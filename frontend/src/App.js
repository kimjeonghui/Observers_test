import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { loginState } from './state/UserState.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Invoice from './pages/Invoice';
import Evidence from './pages/Evidence.jsx';
import EvidenceMonth from './pages/EvidenceMonth.jsx';
import EvidenceDetail from './pages/EvidenceDetail.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ManagerAccountingSlip from './pages/AccountingSlip';
import AccountingSlip from './pages/AccountingSlip';
import AdminCode from './pages/AdminCode';
import AdminOffice from './pages/AdminOffice';
import Users from './pages/Users';
import Summary from './pages/Summary';

import SendImg from './pages/SendImg.jsx';

import Sidebar from './components/global/Sidebar';

function App() {
  const isLogin = useRecoilValue(loginState);
  return (
    <BrowserRouter>
      <div className='App'>
        {isLogin && <Sidebar />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/evidence' element={<Evidence />} />
          <Route path='/evidence/:month' element={<EvidenceMonth />} />
          <Route
            path='/evidence/:month/:evidence-id'
            element={<EvidenceDetail />}
          />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send-img' element={<SendImg />} /> {/* 테스트용 */}
          <Route
            path='/manager/accounting-slip'
            element={<ManagerAccountingSlip />}
          />
          <Route path='/admin-code' element={<AdminCode />} />
          <Route path='/admin-office' element={<AdminOffice />} />
          <Route path='/users' element={<Users />} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/accounting-slip' element={<AccountingSlip />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
