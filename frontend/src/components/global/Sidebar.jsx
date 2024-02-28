import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  Toolbar,
  IconButton,
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Button,
  Drawer,
  AppBar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@emotion/react';
import { userState, loginState } from '../../state/UserState';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from '../global/Logo';

function Sidebar(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const setIsLogin = useSetRecoilState(loginState);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [adminPages, setAdminPages] = useState([
    { name: '사무소관리', address: '/admin-office', status: false },
    { name: '식별코드관리', address: '/admin-code', status: false },
    { name: '사용자관리', address: '/users', status: false },
  ]);
  const [userPages, setUserPages] = useState([
    { name: '당월 자료 입력', address: '/invoice', status: false },
    { name: '월 총괄표', address: '/summary', status: false },
    { name: '회계전표', address: '/accounting-slip', status: false },
    { name: '대시보드', address: '/dashboard', status: false },
    { name: '증빙 자료 관리', address: '/evidence', status: false },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [role, setRole] = useState('user');
  let menuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (user.role === 'ADMIN' || user.role === 'SYSTEM_ADMIN') setRole('admin');
  }, []);

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

  const logout = () => {
    handleClose();
    setIsLogin(false);
    setUser({});
    navigate('/login');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='sticky'
        open={open}
        sx={{
          backgroundColor: theme.palette.posco_lg_100,
          height: '60px',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
            <Logo url='/' width='70px' height='30px' />
          </div>
          <Box sx={{ display: 'flex' }}>
            {role === 'admin' && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                }}
              >
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
                <Typography
                  sx={{
                    color: theme.palette.posco_gray_500,
                    marginRight: '10px',
                    marginLeft: '25px',
                  }}
                >
                  {user.description}님
                </Typography>
                <AccountCircleIcon
                  sx={{
                    color: theme.palette.posco_gray_500,
                    cursor: 'pointer',
                  }}
                  aria-controls={menuOpen}
                  aria-haspopup='true'
                  aria-expanded={menuOpen}
                  onClick={handleClick}
                />
              </Box>
            )}

            <Menu
              id='demo-positioned-menu'
              aria-labelledby='demo-positioned-button'
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => handleDrawerOpen(false)}>
        {role === 'admin' && (
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
                    />
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
        )}
        <Divider />
        <List>
          {userPages.map((page, idx) =>
            role === 'admin' && idx === 0 ? null : page.status ? (
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
                  />
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
