import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";
import db from "./config/db";
import authenticateUser from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "0.0.0.0";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes (authentication routes)
app.use("/api/auth", authRoutes);

app.use(authenticateUser);

//Protected routes
app.use("/api/products", productRoutes);
app.use("/api", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Start server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

// Check MongoDB connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

export default app;
