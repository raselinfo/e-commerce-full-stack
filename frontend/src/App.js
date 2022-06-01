import HomeScreen from "./screen/HomeScreen"
import "./App.css"
import { useContext } from "react"
import { Store } from "./Store"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProductScreen from "./screen/ProductScreen";
import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import CartScreen from "./screen/CartScreen"
import SignInScreen from "./screen/SignInScreen"
import ShippingAddressScreen from "./screen/ShippingAddressScreen"
import SignUpScreen from "./screen/SignUpScreen"
import PaymentMethodScreen from "./screen/PaymentMethodScreen"
import PlaceOrderScreen from "./screen/PlaceOrderScreen"
import OrderScreen from "./screen/OrderScreen"

function App() {
  const { state: { cart, userInfo }, dispatch } = useContext(Store)

  const signoutHandler = () => {
    dispatch({ type: "SIGN_OUT" })
    localStorage.removeItem("userInfo")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
  }
  return (
    <>
      {/* Home Screen */}
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <header className="bg-dark p-2">
              <LinkContainer to="/">
                <Navbar.Brand className="text-white">Emazon</Navbar.Brand>
              </LinkContainer>
              <Nav>
                <Link to="/cart" className="text-white">
                  Cart {cart.cartItems.length > 0 && <Badge bg="danger">{cart.cartItems.reduce((acc, item) => acc += item.quantity, 0)}</Badge>}
                </Link>
              </Nav>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                </NavDropdown>
              ) : (
                <Link to="/signin">Sign IN</Link>
              )}
            </header>


          </Container>

        </Navbar>

        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order:id" element={<OrderScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className="fixed-bottom d-flex align-items-center justify-content-center p-2">
          <p className="text-center">All Rights Reserved </p>
        </footer>
      </BrowserRouter>

    </>
  );
}

export default App;
