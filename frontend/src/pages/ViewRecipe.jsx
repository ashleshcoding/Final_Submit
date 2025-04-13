import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; 

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        setRecipe(response.data.recipe);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="view-recipe-container">
      <h2 className="view-recipe-header">{recipe.title}</h2>

      <div className="view-recipe-image-container">
        {recipe.image && !imageError ? (
          <img
            src={`${recipe.image}?w=375&h=230`}
            alt={recipe.title}
            onError={() => setImageError(true)}
            className="view-recipe-image"
          />
        ) : (
          <p className="view-recipe-image-error">Image not available</p>
        )}
      </div>

      <p className="view-recipe-description">{recipe.description}</p>

      <h3>Ingredients:</h3>
      {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <ul className="view-recipe-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients available</p>
      )}

      <h3>Steps:</h3>
      {recipe.steps && recipe.steps.length > 0 ? (
        <ol className="view-recipe-list">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      ) : (
        <p>No preparation steps available</p>
      )}

      <div className="view-recipe-meta">
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Type:</strong> {recipe.type}</p>
        <p><strong>Duration:</strong> {recipe.duration} mins</p>
      </div>

      <Link to="/dashboard/recipes" className="view-recipe-link">Back to Recipes</Link>
    </div>
  );
};

export default ViewRecipe;
