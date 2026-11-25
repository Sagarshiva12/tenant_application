import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ownerRoutes from "./modules/owners/owner.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(morgan("dev"));

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tenant Admin API is running"
  });
});

// Module routes
app.use("/api/v1/owners", ownerRoutes);

// Centralized error handler (always last)
app.use(errorHandler)

export default app;