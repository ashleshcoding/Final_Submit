import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardNavbar from '../component/DashboardNavbar';
import Recipes from './Recipes';
import AddRecipe from './AddRecipe';
import Favourites from './Favourites';

function Dashboard() {
  return (
    <>
      <DashboardNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="recipes" />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="add-recipe" element={<AddRecipe />} />
        <Route path="favourites" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default Dashboard;
