import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyzeRoutes.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "*", // In production, replace with specific frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// API Routes
app.use("/api", analyzeRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "INVST.AI Backend Server is running smoothly.",
    timestamp: new Date().toISOString()
  });
});

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error handler caught: ", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected server error occurred."
  });
});

export default app;
