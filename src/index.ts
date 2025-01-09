import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import cartRoutes from "./routes/cart";
import transactionRoutes from "./routes/transaction";
import userRoutes from "./routes/user";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/user", userRoutes);

app.listen(8080, () => console.log("server berjalan di port 8080"))

export default app;
