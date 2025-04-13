import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Recipe from './models/Recipe.js';

const app = express();
const PORT = 3001; 
const JWT_SECRET = "your_hardcoded_secret_key"; 

// Middleware
app.use(express.json());
app.use(cors());

import dotenv from 'dotenv';
dotenv.config();


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(" Connected to MongoDB successfully"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Home Route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Welcome</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
          margin: 0;
        }
        .container {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: red;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to the Backend of Savory Share</h1>
        <p>This is the backend home page.</p>
      </div>
    </body>
    </html>
  `);
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
      token,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error in registration" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid username or email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: `Welcome ${user.username}!`,
      userId: user._id,
      token,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error in login" });
  }
});

// Add Recipe Route
app.post("/add-recipe", async (req, res) => {
  const { title, description, ingredients, steps, category, type, duration, image } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      category,
      type,
      duration,
      image,
    });

    await newRecipe.save();
    res.json({ success: true, message: "Recipe added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding recipe" });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes without conditions
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ error: "Error fetching recipes" });
  }
});



app.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: "Recipe not found" });
    }
    res.json({ success: true, recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error fetching the recipe" });
  }
});



// Add to Favourites Route
app.post("/favourites/add", async (req, res) => {
  const { userId, recipeId } = req.body;

  console.log("Add to Favourites - userId:", userId, "recipeId:", recipeId);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ success: false, error: "Invalid userId or recipeId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    // Add to favourites only if not already present
    if (!user.favourites.includes(recipeId)) {
      user.favourites.push(recipeId);
      await user.save();
      return res.json({ success: true, message: "Recipe added to favourites" });
    } else {
      return res.json({ success: true, message: "Recipe already in favourites" });
    }

  } catch (err) {
    console.error("Error adding to favourites:", err);
    res.status(500).json({ success: false, error: "Error adding to favourites" });
  }
});

// Get User Favourites Route
app.get("/favourites/:userId", async (req, res) => {
  const { userId } = req.params;

  console.log("Get Favourites - userId:", userId);

  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, error: "Invalid userId" });
  }

  try {
    const user = await User.findById(userId).populate('favourites');
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    res.json({ success: true, favourites: user.favourites });
  } catch (err) {
    console.error("Error fetching favourites:", err);
    res.status(500).json({ success: false, error: "Error fetching favourites" });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
