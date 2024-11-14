import env from "dotenv";
import { PetModel } from "../../src/database/models/petModel";
env.config();

export const petCreate = async (req: any, res: any) => {
  const userId = res.locals.userId;

  const {
    petName,
    petCategoryId,
    image,
    age,
    sex,
    size,
    weight,
    description,
    location,
    status,
  } = req.body;

  if (
    !petName ||
    !petCategoryId ||
    !image ||
    !description ||
    !age ||
    !sex ||
    !size ||
    !weight ||
    !location
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const newPet = await PetModel.create({
      userId,
      petName,
      petCategoryId,
      image,
      age,
      sex,
      size,
      weight,
      description,
      location,
      status,
    });
    res.status(201).send({ message: "Pet created successfully", newPet });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to create pet", error });
  }
};
