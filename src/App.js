import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import LandingPage from "./Components/LandingPage";
import AdminDashboard from "./Components/AdminDashboard";
import MeterApp from "./Components/MeterApp";

function App() {
  const handleChange = () => {
    console.log("Value changed");
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path={"/"}
            element={<LandingPage handleChange={handleChange} />}
          />
          <Route exact path={"/dashboard"} element={<AdminDashboard />} />
          <Route path={"/meter"} element={<MeterApp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
