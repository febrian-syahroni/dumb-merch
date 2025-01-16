import express from "express";
import {
  createCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/category";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", editCategory);

export default categoryRouter;
