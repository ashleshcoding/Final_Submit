import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [mealType, setMealType] = useState("");
  const [foodType, setFoodType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipes", {
        params: {
          category: mealType,
          type: foodType,
          search: searchTerm,
        },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  
  const fetchFavourites = async () => {
    try {
      const userId = localStorage.getItem("userId"); 
      if (!userId) {
        console.error("User ID missing in localStorage!");
        return;
      }

      const response = await axios.get(`http://localhost:3001/favourites/${userId}`);
      setFavourites(response.data.favourites);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchFavourites();
  }, [mealType, foodType, searchTerm]);

  
  const addToFavourites = async (recipeId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in! Please log in.");
        return;
      }

      await axios.post("http://localhost:3001/favourites/add", { userId, recipeId });
      alert("Added to Favourites ✅");
      fetchFavourites(); 
    } catch (error) {
      console.error("Error adding to favourites:", error);
      alert("Failed to add to favourites!");
    }
  };

  
  const isFavourite = (recipeId) => {
    return favourites.some(favId => favId.toString() === recipeId.toString());
  };
  

  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Recipes</h1>

      
      <div className="card p-3 mb-4">
        <div className="row">
          
          <div className="col-md-4 mb-2">
            <label htmlFor="mealType" className="form-label">Meal Type:</label>
            <select
              className="form-select"
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="">All</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Snack">Snack</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          
          <div className="col-md-4 mb-2">
            <label htmlFor="foodType" className="form-label">Food Type:</label>
            <select
              className="form-select"
              id="foodType"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
            >
              <option value="">All</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

         
          <div className="col-md-4 mb-2">
            <label htmlFor="search" className="form-label">Search:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="col-md-3 mb-4" key={recipe._id}>
              <div className="card h-100">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{recipe.description}</p>
                    <p className="card-text text-muted">
                      ⏱️ Duration: {recipe.duration}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      className={`btn btn-sm ${isFavourite(recipe._id) ? "btn-secondary" : "btn-danger"}`}
                      onClick={() => addToFavourites(recipe._id)}
                      disabled={isFavourite(recipe._id)}
                    >
                      {isFavourite(recipe._id) ? "Added" : "Add to Favourites"}
                    </button>
                    <Link to={`/viewrecipe/${recipe._id}`} className="text-decoration-none text-primary">
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No recipes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
