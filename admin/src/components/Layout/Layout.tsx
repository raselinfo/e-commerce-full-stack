import { Outlet } from 'react-router-dom';
import { useMediaQuery, Box } from '@mui/material';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

function Layout() {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <Box width="100%" height="100%" display={isNonMobile ? 'flex' : 'block'}>
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
}

export default Layout;
