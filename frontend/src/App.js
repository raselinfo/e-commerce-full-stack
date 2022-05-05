import HomeScreen from "./screen/HomeScreen"
import "./App.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProductScreen from "./screen/ProductScreen";
function App() {
  return (
    <div>      
      {/* Home Screen */}
      <BrowserRouter>
        <header className="bg-dark p-2">
          <div className="container">
            <Link to="/">
              <h1 className="text-white">Emazon</h1>
            </Link>

          </div>
        </header>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
