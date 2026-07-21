const express = require("express");
const cors = require("cors");


const authRoutes = require("./src/routes/authRoutes");
// const vehicleRoutes = require("./src/routes/vehicleRoutes");
// const inventoryRoutes = require("./src/routes/inventoryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/vehicles", inventoryRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Car Dealership API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;