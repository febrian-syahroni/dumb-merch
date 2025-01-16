import express from "express";
import { editCategory, getAllCategories, getCategoryById } from "../controllers/category";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", editCategory);

export default categoryRouter;
