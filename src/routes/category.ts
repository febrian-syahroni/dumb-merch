import express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/category";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", editCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
