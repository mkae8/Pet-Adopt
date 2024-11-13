import { PetModel } from "../../src/database/models/petModel";
import env from "dotenv";
env.config();

export const petCreate = async (req: any, res: any) => {
  const userId = res.locals.userId;

  const {
    petName,
    // petCategory,
    // image,
    age,
    sex,
    size,
    weight,
    description,
    location,
  } = req.body;

  if (
    !petName ||
    // !petCategory ||
    // !image ||
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
      //   petCategory,
      // image,
      age,
      sex,
      size,
      weight,
      description,
      location,
    });
    res.status(201).send({ message: "Pet created successfully", newPet });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: "Failed to create pet" });
  }
};
