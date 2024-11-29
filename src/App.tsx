import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Homepage, Storepage, ChooseDrink, ChooseSides, CartPage, PaymentPage, ConfirmationPage } from "../src/components/index.ts";
import { CartProvider } from "./components/data/contexts/CartContext.tsx";
import { BottomNav } from "./components/BottomNav.tsx";
import { DrinkMenuPage } from "./components/DrinkMenuPage.tsx";

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/store" element={<Storepage />} />
          <Route path="/drinkmenu" element={<DrinkMenuPage />} />
          <Route path="/chooseDrink" element={<ChooseDrink />} />
          <Route path="/chooseside" element={<ChooseSides />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
          <Route path="/confirmationpage" element={<ConfirmationPage />} />
        </Routes>
        <BottomNav />
      </CartProvider>
    </Router>
  );
}

export default App;
