import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import LandingPage from "./Components/LandingPage";
import AdminDashboard from "./Components/AdminDashboard";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
