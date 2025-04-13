import React, { useState } from 'react';
import axios from 'axios';

function AddRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    category: '',
    type: '',
    duration: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleArrayChange = (index, e, field) => {
    const updatedArray = [...recipeData[field]];
    updatedArray[index] = e.target.value;
    setRecipeData({ ...recipeData, [field]: updatedArray });
  };

  const addField = (field) => {
    setRecipeData({ ...recipeData, [field]: [...recipeData[field], ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/add-recipe', recipeData);
      if (response.data.success) {
        alert('Recipe added successfully!');
       
        setRecipeData({
          title: '',
          description: '',
          ingredients: [''],
          steps: [''],
          category: '',
          type: '',
          duration: '',
          image: ''
        });
      } else {
        alert('Failed to add recipe. Please try again.');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('An error occurred while adding the recipe.');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Recipe Name</label>
          <input type="text" className="form-control" name="title" value={recipeData.title} onChange={handleChange} placeholder="Enter recipe name" required />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={recipeData.description} onChange={handleChange} rows="3" placeholder="Describe your recipe" required />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          {recipeData.ingredients.map((ingredient, index) => (
            <input key={index} type="text" className="form-control mb-2" value={ingredient} onChange={(e) => handleArrayChange(index, e, 'ingredients')} placeholder={`Ingredient ${index + 1}`} required />
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => addField('ingredients')}>Add More Ingredients</button>
        </div>

        
        <div className="mb-3">
          <label className="form-label">Preparation Steps</label>
          {recipeData.steps.map((step, index) => (
            <input key={index} type="text" className="form-control mb-2" value={step} onChange={(e) => handleArrayChange(index, e, 'steps')} placeholder={`Step ${index + 1}`} required />
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => addField('steps')}>Add More Steps</button>
        </div>

        
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" name="category" value={recipeData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snack">Snack</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select className="form-select" name="type" value={recipeData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input type="text" className="form-control" name="duration" value={recipeData.duration} onChange={handleChange} placeholder="e.g., 40 mins" required />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" className="form-control" name="image" value={recipeData.image} onChange={handleChange} placeholder="Enter image URL" required />
        </div>

        
        <button type="submit" className="btn btn-primary">Submit Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
