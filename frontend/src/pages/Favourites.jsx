import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  
  const fetchFavouriteRecipes = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3001/favourites/${userId}`);
      setFavouriteRecipes(response.data.favourites); 
    } catch (error) {
      console.error("Error fetching favourite recipes:", error);
    }
  };

  useEffect(() => {
    fetchFavouriteRecipes();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Favourites</h1>

      
      <div className="row">
        {Array.isArray(favouriteRecipes) && favouriteRecipes.length > 0 ? (
          favouriteRecipes.map((recipe) => (
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
                      ⏱️ Duration: {recipe.duration} mins
                    </p>
                  </div>
                  <div className="text-center">
                    <Link to={`/viewrecipe/${recipe._id}`} className="btn btn-primary mt-2">
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">You have no favourite recipes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
