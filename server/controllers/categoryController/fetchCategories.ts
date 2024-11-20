import { Request, Response } from "express";
import { CategoryModel } from "../../src/database/models/categoryModel";

export const fetchCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch categories" });
  }
};
