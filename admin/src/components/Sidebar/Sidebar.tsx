import React, { useEffect, useState } from 'react';
import {
  Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, Color,
} from '@mui/material';

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../mui-component/FlexBetween/FlexBetween';
import Items from './Items';

interface SidebarType {
  isNonMobile: boolean;
  drawerWidth: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar({
  isNonMobile, drawerWidth, isSidebarOpen, setIsSidebarOpen,
}: SidebarType) {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box position="relative">
      {
        isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: ((theme.palette.secondary as unknown) as Color)[200],
              backgroundColor: 'background.alt',
              width: drawerWidth,
              borderWidth: isNonMobile ? 0 : '2px',
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    RaselFashion.
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft fontSize="large" />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {Items.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? ((theme.palette.secondary as unknown) as Color)[300]
                            : 'transparent',
                        color:
                          active === lcText
                            ? ((theme.palette.primary as unknown) as Color)[600]
                            : ((theme.palette.secondary as unknown) as Color)[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === lcText
                              ? ((theme.palette.primary as unknown) as Color)[600]
                              : ((theme.palette.secondary as unknown) as Color)[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                      <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box mt="5px" sx={{ position: 'absolute', bottom: '30px', width: '100%' }}>
            <Divider />
            <Box display="flex" justifyContent="center" gap="20px" alignItems="center" mt="10px">
              <Box component="img" alt="profile" src="" height="40px" width="40px" borderRadius="50%" sx={{ backgroundColor: 'primary.main', objectFit: 'cover' }} />
              <Box display="flex" gap="5px">
                {/* <Typography fontWeight="bold" fontSize="20px" sx={{ color: ((theme.palette.secondary as unknown) as Color)[200] }}>
                  Rasel
                </Typography> */}
                <SettingsOutlined
                  sx={{
                    color: ((theme.palette.secondary as unknown) as Color)[300],
                    fontSize: '25px ',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Drawer>
        )
     }
    </Box>
  );
}

export default Sidebar;
