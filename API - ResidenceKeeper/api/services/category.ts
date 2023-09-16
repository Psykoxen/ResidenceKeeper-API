import { CategoryHelper } from "../models/category/helpers";
import Category from "../models/category/category";

export namespace CategoryService {
  export const getAllCategories = (): Array<Category> => {
    return CategoryHelper.getAllCategories();
  };

  export const createCategory = (category: Category): void => {
    CategoryHelper.createCategory(category);
  };

  export const deleteCategory = (id: number): void => {
    CategoryHelper.deleteCategory(id);
  };

  export const getCategoryById = (id: number): Category => {
    return CategoryHelper.getCategoryById(id);
  };
}
