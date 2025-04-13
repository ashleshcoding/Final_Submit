import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function DashboardNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated"); 
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        <span className="navbar-brand">Savory Share</span>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#dashboardNavbarNav" 
          aria-controls="dashboardNavbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="dashboardNavbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                to="/dashboard/recipes" 
                className={`nav-link ${location.pathname.includes("/dashboard/recipes") ? "active text-white fw-bold" : ""}`}
              >
                Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/dashboard/add-recipe" 
                className={`nav-link ${location.pathname.includes("/dashboard/add-recipe") ? "active text-white fw-bold" : ""}`}
              >
                Add Recipe
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/dashboard/favourites" 
                className={`nav-link ${location.pathname.includes("/dashboard/favourites") ? "active text-white fw-bold" : ""}`}
              >
                Favourites
              </NavLink>
            </li>
          </ul>
          <button className="btn btn-outline-light ms-3" onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
