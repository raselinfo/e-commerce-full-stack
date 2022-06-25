import HomeScreen from "./screen/HomeScreen"
import "./App.css"
import { useContext, useEffect, useState } from "react"
import { Store } from "./Store"
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import ProductScreen from "./screen/ProductScreen";
import { Navbar, Container, Nav, Badge, NavDropdown, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import CartScreen from "./screen/CartScreen"
import SignInScreen from "./screen/SignInScreen"
import ShippingAddressScreen from "./screen/ShippingAddressScreen"
import SignUpScreen from "./screen/SignUpScreen"
import PaymentMethodScreen from "./screen/PaymentMethodScreen"
import PlaceOrderScreen from "./screen/PlaceOrderScreen"
import OrderScreen from "./screen/OrderScreen"
import OrderHistoryScreen from "./screen/OrderHistoryScreen"
import ProfileScreen from "./screen/ProfileScreen"
import handleError from "./utils"
import { toast } from "react-toastify"
import axios from "axios"
import SearchBox from "./components/SearchBox"
import SearchScreen from "./screen/SearchScreen"

function App() {
  const { state: { cart, userInfo }, dispatch } = useContext(Store)
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [categories, setCategories] = useState([])
  const signoutHandler = () => {
    dispatch({ type: "SIGN_OUT" })
    localStorage.removeItem("userInfo")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/product/categories')
        setCategories(data)
      } catch (err) {
        toast.error(handleError(err))
      }
    }
    fetchData()
  }, [])


  return (
    <>
      {/* Home Screen */}
      <BrowserRouter>
        <div className={
          isSideBarOpen ? 'active-cont' : ''
        }>

          <Navbar bg="dark" variant="dark" className="side-container">
            <Container>
              <Button variant="dark" onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                <i className="fas fa-bars"></i>
              </Button>
              <header className="bg-dark p-2">
                <SearchBox />
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
                    <Link to="/signin" onClick={signoutHandler}>Sign Out</Link>
                  </NavDropdown>
                ) : (
                  <Link to="/signin">Sign IN</Link>
                )}
              </header>
            </Container>

          </Navbar>
          <div className={
            isSideBarOpen ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }>
            <Nav className="d-flex flex-column justify-content-center">
              <Nav.Item>
                <strong className="text-white">Categories</strong>
              </Nav.Item>
              {
                categories.map((category) => {
                  return <Nav.Item key={category}>
                    <LinkContainer
                      to={`/search?category=${category}`}
                      onClick={() => setIsSideBarOpen(false)}>
                      <Nav.Link className="text-white">{category}</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                })
              }
            </Nav>
          </div>
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
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/orderhistory" element={<OrderHistoryScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/search" element={<SearchScreen />} />
              </Routes>
            </Container>
          </main>
          <footer className="fixed-bottom d-flex align-items-center justify-content-center p-2">
            <p className="text-center">All Rights Reserved </p>
          </footer>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
