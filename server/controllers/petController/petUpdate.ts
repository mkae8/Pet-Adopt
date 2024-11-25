import env from "dotenv";
import { PetModel } from "../../src/database/models/petModel";
env.config();

export const petUpdate = async (req: any, res: any) => {
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
    isVaccined,
    petId,
  } = req.body;
  console.log(req.body);

  if (
    !petName ||
    !petCategoryId ||
    !image ||
    !description ||
    !age ||
    !sex ||
    !size ||
    !weight ||
    !location ||
    !isVaccined ||
    !status
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const updatePet = await PetModel.findOneAndUpdate(
      { _id: petId },
      {
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
        isVaccined,
      }
    );
    res
      .status(201)
      .send({ message: "Амьтны мэдээлэл шинэчлэгдлээ", updatePet });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to create pet", error });
  }
};
