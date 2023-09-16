import { Request, Response } from "express";
import { CategoryService } from "../services/category";

const route = require("express").Router();

route.get("/", (req: Request, res: Response) => {
  const categories = CategoryService.getAllCategories();
  res.send(categories);
});

route.post("/create", (req: Request, res: Response) => {
  const category = req.body;
  CategoryService.createCategory(category);
  res.sendStatus(200);
});

route.post("/delete", (req: Request, res: Response) => {
  const { id } = req.body;
  CategoryService.deleteCategory(id);
  res.sendStatus(200);
});

route.post("/getcategory", (req: Request, res: Response) => {
  const { id } = req.body;
  res.send(CategoryService.getCategoryById(id));
});

export default route;
