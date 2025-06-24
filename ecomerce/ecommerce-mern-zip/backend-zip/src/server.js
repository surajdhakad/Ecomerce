const express = require("express");
const cors = require("cors");

const { connectDb } = require("./config/db");
const userService = require("./services/user.service.js");

const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js"); // ✅ Added

const app = express();
const PORT = 5454;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the ecommerce API (Node.js)" });
});

// ✅ API Routes
app.use("/auth", authRoutes);         // ✅ Mount auth route
app.use("/api/v1/user", userRoutes);  // User routes

// Start server
app.listen(PORT, async () => {
    try {
        await connectDb();
        await userService.initializeAdminUser();
        console.log("✅ Ecommerce API running at http://localhost:" + PORT);
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
    }
});
