import HomeScreen from "./screen/HomeScreen"
import "./App.css"
import { useContext } from "react"
import { Store } from "./Store"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProductScreen from "./screen/ProductScreen";
import { Navbar, Container, Nav, Badge } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
function App() {
  const { state: { cart: { cartItems
  } } } = useContext(Store)
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
                  Cart {cartItems.length > 0 && <Badge bg="danger">{cartItems.length}</Badge>}
                </Link>
              </Nav>
            </header>
            

          </Container>

        </Navbar>

        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
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
