import { Index } from "./page/Index";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Header } from "./components/common/Header";
import ProductDetail from "./components/ProductDetail";
import { Footer } from "./components/common/Footer";
import ProductsPage from "./page/ProductsPage";
import CartPage from "./page/CartPage";
import CreateProduct from "./page/CreateProduct";
import SignIn from "./page/SignIn";
import ProductBrand from "./page/ProductBrand";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/brand/:brand" element={<ProductBrand />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
