// models/Recipe.js
import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    enum: ["Breakfast", "Lunch", "Snack", "Dinner"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // optional: adds createdAt and updatedAt

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
