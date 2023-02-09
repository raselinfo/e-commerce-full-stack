import React from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';

import {
  AppBar,
  useTheme,
  Toolbar,
  IconButton,
  InputBase,
  Box,
} from '@mui/material';
import FlexBetween from '../mui-component/FlexBetween/FlexBetween';
import { useAppDispatch } from '../../store';
import { setMode } from '../../store/slices/globalSlice';

interface NavbarType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavbarType) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  return (
    <Box>
      <AppBar
        sx={{
          position: 'static',
          background: 'none',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <FlexBetween
              sx={{
                backgroundColor: 'background.alt',
                borderRadius: '9px',
                gap: '3rem',
                p: '0.1rem 1.5rem',
              }}
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          </FlexBetween>
          {/* Right */}
          <FlexBetween>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <LightModeOutlined sx={{ fontSize: '25px' }} />
              ) : (
                <DarkModeOutlined sx={{ fontSize: '25px' }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlined sx={{ fontSize: '25px' }} />
            </IconButton>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
