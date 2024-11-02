import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePages from "./pages/homePages";
import TrainSelection from "./pages/trainSelection";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TrainSelection1 from "./components/trainSelection1";
import BookingDetail from "./pages/BookingDetail";
import PaymentPages from "./pages/paymentPages";
import BookingSummary from "./pages/bookingSummary";
import TrainResults from "./pages/trainResult";

function App() {
  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/trainSelection" element={<TrainSelection />} />
            <Route path="/trainSelection2" element={<TrainSelection1 />} />
            <Route path="/BookingDetail/:id" element={<BookingDetail />} />
            <Route path="/PaymentPages" element={<PaymentPages />} />
            <Route path="/bookingSummary" element={<BookingSummary />} />
            <Route path="/train" element={<TrainResults />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
