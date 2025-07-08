import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
// import ProductPage from './pages/ProductPage'; // for future
// import CartPage from './pages/CartPage'; // for future

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/product/:id" element={<ProductPage />} /> */}
          {/* <Route path="/cart" element={<CartPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
