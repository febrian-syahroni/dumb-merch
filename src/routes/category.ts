import express from "express";
import { getAllCategories } from "../controllers/category";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);

export default categoryRouter;
