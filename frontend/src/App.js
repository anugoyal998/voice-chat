import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/shared/Navigation";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

const App = () => {
  return (
    <div className="h-screen bg-bgPrimary">
      <Navigation/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
