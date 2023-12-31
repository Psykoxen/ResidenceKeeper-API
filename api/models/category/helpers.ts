import { database } from "../../config/database";
import Category from "./category";
import jsonfile from "jsonfile";

export namespace CategoryHelper {
  export const getAllCategories = (): Array<Category> => {
    const rows = database.prepare("SELECT * FROM category").all();
    const categories: Category[] = rows.map(
      (row: any) => new Category(row.id, row.name)
    );

    return categories;
  };

  export const createCategory = (category: Category): void => {
    database
      .prepare(
        `
        INSERT INTO category (name) VALUES (@name)
        `
      )
      .run(category);
  };

  export const deleteCategory = (id: number): void => {
    database
      .prepare(
        `
        DELETE FROM category WHERE id = @id
        `
      )
      .run({ id });
  };

  export const getCategoryById = (id: number): Category => {
    const category = database
      .prepare(
        `
        SELECT * FROM category WHERE id = @id
        `
      )
      .get({ id }) as Category;

    return category;
  };

  export const importCategories = (): void => {
    const data = jsonfile.readFileSync("./backup/categories.json");
    database.prepare("DELETE FROM category").run();
    data.forEach((category: Category) => {
      database
        .prepare(
          `
          INSERT INTO category (id,name) VALUES (@id,@name)
          `
        )
        .run(category);
    });
  };

  export const exportCategories = (): void => {
    const data = getAllCategories();
    jsonfile.writeFileSync("./backup/categories.json", data);
  };
}

export default CategoryHelper;
