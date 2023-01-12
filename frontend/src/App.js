import './App.css';
import Google from './components/Google';

import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
// import Home from './views/Home';
const Home = lazy(() => import('./views/Home'));

// import Layout from './components/Layout';
const Layout = lazy(() => import('./components/Layout'));

// import ProductDetails from './views/ProductDetails';
const ProductDetails = lazy(() => import('./views/ProductDetails'));

// import Cart from './views/Cart';
const Cart = lazy(() => import('./views/Cart'));

// import SignIn from './views/SignIn';
const SignIn = lazy(() => import('./views/SignIn'));

// import Protected from './Protected_Route/Protected';
const Protected = lazy(() => import('./Protected_Route/Protected'));

// import SignUp from './views/SignUp';
const SignUp = lazy(() => import('./views/SignUp'));

// import VerifyMail from './views/VerifyMail';
const VerifyMail = lazy(() =>
  import('./views/VerifyMail' /* webpackChunkName: "VerifyMail" */)
);

// import AuthProtect from './Protected Route/AuthProtect';
const AuthProtect = lazy(() => import('./Protected_Route/AuthProtect'));

// const Google = lazy(() => import('./components/Google'));

// import ForgotPassword from './views/ForgotPassword';
const ForgotPassword = lazy(() => import('./views/ForgotPassword'));

// import ResetPassword from './views/ResetPassword';
const ResetPassword = lazy(() => import('./views/ResetPassword'));

// import CheckOut from './views/Checkout';
const CheckOut = lazy(() => import('./views/Checkout'));

// import Order from './views/Order';
const Order = lazy(() => import('./views/Order'));

// import OrderHistory from './views/OrderHistory';
const OrderHistory = lazy(() => import('./views/OrderHistory'));

// import Profile from './views/Profile';
const Profile = lazy(() => import('./views/Profile'));
const rootPath = window.location.pathname;
function App() {
  return (
    <>
      <ToastContainer theme='colored' />
      <Layout />
      {rootPath === '/' && <Google isOpenLoginButton={false} />}
      <Suspense fallback={<h1>Loading.....</h1>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<h1>Hello Admin</h1>} />
          <Route path='/product/:slug' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route
            path='/checkout'
            element={
              <Protected>
                <CheckOut />
              </Protected>
            }
          />

          <Route
            path='/signin'
            element={
              <AuthProtect>
                <SignIn />
              </AuthProtect>
            }
          />
          <Route
            path='/signup'
            element={
              <AuthProtect>
                <SignUp />
              </AuthProtect>
            }
          />
          <Route
            path='/Verify/:email/:token'
            element={
              <AuthProtect>
                <VerifyMail />
              </AuthProtect>
            }
          />
          <Route
            path='/order/:orderID'
            element={
              <Protected>
                <Order />
              </Protected>
            }
          />
          <Route
            path='/order_history'
            element={
              <Protected>
                <OrderHistory />
              </Protected>
            }
          />
          <Route
            path='/profile'
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route path='/forgot/password' element={<ForgotPassword />} />
          <Route path='/reset/password/:token' element={<ResetPassword />} />
          <Route path='*' element={<h1>Not Found 404 </h1>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
