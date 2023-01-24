import { lazy, useState } from 'react';
const Navbar = lazy(() => import('./Navbar'));
const SideBar = lazy(() => import('./SideBar/SideBar'));
const Layout = () => {
  const pathname = window.location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const isOpenHandler = () => {
    setIsOpen(!isOpen);
  };
  if (!(pathname.includes('/admin') || pathname.includes('/dashboard'))) {
    return (
      <>
        <Navbar isOpenHandler={isOpenHandler} isOpen={isOpen} />
        <SideBar isOpenHandler={isOpenHandler} isOpen={isOpen} />
      </>
    );
  }
  return <div>Admin Navbar</div>;
};
export default Layout;
