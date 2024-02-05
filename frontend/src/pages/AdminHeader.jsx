import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function AdminHeader(props) {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Tabs>
            <Tab label='사무소관리' href='/admin-home' />
            <Tab label='식별코드' href='/admin-code' />
            <Tab label='사용자관리' href='/users' />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}
