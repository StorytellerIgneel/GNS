import { HashRouter, Routes, Route } from "react-router-dom";
import StorePage from "./frontend/pages/StorePage.jsx";
import CartPage from "./frontend/pages/CartPage.jsx";
import OAuth from "./backend/OAuth.jsx";
import ProductPage from "./frontend/pages/ProductPage.jsx";
import Layout from "./frontend/include/Layout.jsx";
import { CartProvider } from "./frontend/Cart/CartContext.jsx";
import MainPage from "./frontend/pages/MainPage.jsx";
import LoginPage from "./frontend/pages/LoginPage.jsx";
import "./index.css";
import { UserProvider } from "./frontend/pages/LoginContext.jsx";
import Email from "./frontend/Email/email.jsx";
import ProfilePage from "./frontend/pages/ProfilePage.jsx";
import FAQ from "./frontend/pages/FAQ.jsx";

function App() {
  return (
    <div>
      <UserProvider>
        <CartProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/store/:game_id" element={<ProductPage />} />
                <Route path="/support" element={<Email />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/faq" element={<FAQ />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </HashRouter>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
