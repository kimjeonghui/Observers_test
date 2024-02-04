import React from 'react';

import { Bg } from '../components/global/GlobalStyles';
import CustomContainer from '../components/global/Container';
import { Routes, Route } from 'react-router-dom';
import Invoice from './Invoice';

export default function Home(props) {
  return (
    <div>
      <Bg>
        <CustomContainer width='80' height='78'>
          <Routes>
            <Route path='/' element={<h1>Home Page</h1>} />
            <Route path='/invoice' element={<Invoice />} />
          </Routes>
        </CustomContainer>
      </Bg>
    </div>
  );
}
