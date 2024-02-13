import React, { useNavigate } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Invoice from './pages/Invoice';
import Receipts from './pages/Receipts';
import ReceiptsMonth from './pages/ReceiptsMonth';
import ReceiptsDetail from './pages/ReceiptsDetail';
import Ocr from './pages/Ocr';
import ManagerAccountingSlip from './pages/ManagerAccountingSlip';
import AdminAccountingSlip from './pages/AdminAccountingSlip';
import AdminCode from './pages/AdminCode';
import AdminOffice from './pages/AdminOffice';
import Users from './pages/Users';
import Summary from './pages/Summary';
import Navbar from './components/global/Navbar';

function App() {
  const isLoginPage = window.location.pathname === '/login';
  return (
    <BrowserRouter>
      <div className='App'>
        {!isLoginPage && <Navbar />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/receipts' element={<Receipts />} />
          <Route path='/receipts/:id' element={<ReceiptsMonth />} />
          <Route path='/receipts/:id/:id' element={<ReceiptsDetail />} />
          <Route path='/ocr' element={<Ocr />} />
          <Route
            path='/manager/accounting-slip'
            element={<ManagerAccountingSlip />}
          />
          <Route path='/admin-code' element={<AdminCode />} />
          <Route path='/admin-office' element={<AdminOffice />} />
          <Route path='/users' element={<Users />} />
          <Route path='/summary' element={<Summary />} />
          <Route
            path='/admin/accounting-slip'
            element={<AdminAccountingSlip />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
