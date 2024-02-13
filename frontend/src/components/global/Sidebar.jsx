import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Toolbar,
  IconButton,
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Drawer,
  AppBar,
} from '@mui/material';

import { useTheme } from '@emotion/react';

import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import Logo from '../global/Logo';

function Sidebar(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [adminPages, setAdminPages] = useState([
    { name: '사무소관리', address: '/admin-office', status: false },
    { name: '식별코드관리', address: '/admin-code', status: false },
    { name: '사용자관리', address: '/users', status: false },
  ]);
  const [userPages, setUserPages] = useState([
    { name: '당월 자료 입력', address: '/invoice', status: false },
    { name: '월 총괄표', address: '/accounting-slip', status: false },
    { name: '회계전표', address: '/summary', status: false },
    { name: '대시보드', address: '/ocr', status: false },
    { name: '증빙자료관리', address: '/receipts', status: false },
  ]);

  useEffect(() => {
    const path = location.pathname;
    // Admin Pages 업데이트
    const updatedAdminPages = adminPages.map((page) => ({
      ...page,
      status: path === page.address,
    }));

    // User Pages 업데이트
    const updatedUserPages = userPages.map((page) => ({
      ...page,
      status: path === page.address,
    }));

    // 최종적으로 모든 페이지 업데이트
    setAdminPages(updatedAdminPages);
    setUserPages(updatedUserPages);
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        open={open}
        sx={{
          backgroundColor: theme.palette.posco_lg_100,
          height: '60px',
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              ml: 1,
              marginRight: 1,
              color: theme.palette.posco_blue_500,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Logo url='/home' width='70px' height='30px' />
          <Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {adminPages.map((page) =>
                page.status ? (
                  <Link
                    to={page.address}
                    key={page.name}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      sx={{
                        my: 2,
                        color: theme.palette.posco_black,
                        display: 'block',
                        m: 0,
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to={page.address}
                    key={page.name}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      sx={{
                        my: 2,
                        color: theme.palette.posco_lg_500,
                        display: 'block',
                        m: 0,
                        '&:hover': {
                          color: theme.palette.posco_gray_500,
                        },
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                )
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => handleDrawerOpen(false)}>
        <List sx={{ display: { xs: 'block', md: 'none' } }}>
          {adminPages.map((page) =>
            page.status ? (
              <Link
                to={page.address}
                key={page.name}
                style={{ textDecoration: 'none' }}
              >
                <ListItem sx={{ width: '25vw', height: '60px' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '30px',
                      backgroundColor: theme.palette.posco_blue_500,
                    }}
                  ></div>
                  <ListItemButton
                    sx={{
                      my: 2,
                      color: theme.palette.posco_blue_500,
                    }}
                  >
                    {page.name}
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <Link
                to={page.address}
                key={page.name}
                style={{ textDecoration: 'none' }}
              >
                <ListItemButton
                  sx={{
                    my: 2,
                    color: theme.palette.posco_gray_700,
                    '&:hover': {
                      color: theme.palette.posco_gray_900,
                    },
                  }}
                >
                  {page.name}
                </ListItemButton>
              </Link>
            )
          )}
        </List>
        <Divider />
        <List>
          {userPages.map((page) =>
            page.status ? (
              <Link
                to={page.address}
                key={page.name}
                style={{ textDecoration: 'none' }}
              >
                <ListItem sx={{ width: '25vw', height: '60px' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '30px',
                      backgroundColor: theme.palette.posco_blue_500,
                    }}
                  ></div>
                  <ListItemButton
                    sx={{
                      my: 2,
                      color: theme.palette.posco_blue_500,
                    }}
                  >
                    {page.name}
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <Link
                to={page.address}
                key={page.name}
                style={{ textDecoration: 'none' }}
              >
                <ListItemButton
                  sx={{
                    my: 2,
                    color: theme.palette.posco_gray_700,
                    '&:hover': {
                      color: theme.palette.posco_gray_900,
                    },
                  }}
                >
                  {page.name}
                </ListItemButton>
              </Link>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
