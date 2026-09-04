import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
