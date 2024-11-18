const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (temporary solution for demo purposes)
let foodItems = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'chocolate' }
];

let nextId = 3;

// API Routes
// Get all food items
app.get("/api/foods", (_req, res) => {
  res.json(foodItems);
});

// Add a new food item
app.post("/api/foods", (req, res) => {
  const newFoodName = req.body.name?.trim();
  if (!newFoodName || newFoodName.length < 3) {
    return res.status(400).json({ message: "Food name must be at least 3 characters long." });
  }

  // Check if the food name already exists (case-insensitive)
  const foodExists = foodItems.some(item => item.name && item.name.toLowerCase() === newFoodName.toLowerCase());
  if (foodExists) {
    return res.status(400).json({ message: "Food item already exists." });
  }

  const newFood = { id: nextId++, name: newFoodName }; // Generate a simple id
  foodItems.push(newFood);
  res.status(201).json({ message: "Food item added successfully", foodItems });
});

// Delete a food item by id
app.delete("/api/foods/:id", (req, res) => {
  const foodId = parseInt(req.params.id, 10);
  const foodToDelete = foodItems.find(item => item.id === foodId);

  if (!foodToDelete) {
    return res.status(404).json({ message: "Food item not found" });
  }

  foodItems = foodItems.filter(item => item.id !== foodId);
  res.json({ message: "Food item deleted successfully", foodItems });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
