import { CategoryModel } from "../../src/database/models/categoryModel";
import env from "dotenv";
env.config();

export const categoryController = async (req: any, res: any) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).send({ message: "hooson bn" });
  }

  try {
    const newCategory = await CategoryModel.create({
      categoryName,
    });
    res
      .status(201)
      .send({ message: "Category created successfully", newCategory });
  } catch (error) {
    res.status(500).send({ message: "Failed to create category" });
  }
};
