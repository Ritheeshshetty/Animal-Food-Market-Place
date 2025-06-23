import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const app = express();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/supplier", supplierRoutes);
app.use('/api/cart', cartRoutes);


export default app;
