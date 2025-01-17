import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import cartRoutes from "./routes/cart";
import transactionRoutes from "./routes/transaction";
import cors from "cors";
import categoryRouter from "./routes/category";
import genderRoutes from "./routes/gender";
import { userRouter } from "./routes/user";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/user", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/gender", genderRoutes);

app.listen(8080, () => console.log("server berjalan di port 8080"))

export default app;
