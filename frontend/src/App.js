import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ViewRecipe from "./pages/ViewRecipe";
import Navbar from "./component/Navbar";
import PrivateRoute from "./component/PrivateRoute"; // ✅ import private route

function App() {
  const location = useLocation();

  const showDefaultNavbar = ["/", "/about", "/contact"].includes(location.pathname);

  return (
    <>
      {showDefaultNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Private Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ Public view recipe */}
        <Route path="/viewrecipe/:id" element={<ViewRecipe />} />

        {/* 404 Page */}
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
