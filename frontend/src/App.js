import './App.css';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

const Search = lazy(() => import('./views/Search'));
const Home = lazy(() => import('./views/Home'));
const Layout = lazy(() => import('./components/Layout'));
const ProductDetails = lazy(() => import('./views/ProductDetails'));
const Cart = lazy(() => import('./views/Cart'));
const SignIn = lazy(() => import('./views/SignIn'));
const Protected = lazy(() => import('./Protected_Route/Protected'));
const SignUp = lazy(() => import('./views/SignUp'));
const VerifyMail = lazy(() =>
  import('./views/VerifyMail' /* webpackChunkName: "VerifyMail" */)
);
const AuthProtect = lazy(() => import('./Protected_Route/AuthProtect'));
const Google = lazy(() => import('./components/Google'));
const ForgotPassword = lazy(() => import('./views/ForgotPassword'));
const ResetPassword = lazy(() => import('./views/ResetPassword'));
const CheckOut = lazy(() => import('./views/Checkout'));
const Order = lazy(() => import('./views/Order'));
const OrderHistory = lazy(() => import('./views/OrderHistory'));
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
          <Route path='/search' element={<Search />} />
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
