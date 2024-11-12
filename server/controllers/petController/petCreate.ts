// import { PetModel } from "../../src/database/models/petModel";
// import env from "dotenv";
// env.config();

// export const petCreate = async (req: any, res: any) => {
//   const {
//     petName,
//     // petCategory,
//     image,
//     age,
//     sex,
//     size,
//     weight,
//     description,
//     location,
//     status,
//   } = req.body;

//   if (
//     !petName ||
//     // !petCategory ||
//     !image ||
//     !description ||
//     !age ||
//     !sex ||
//     !size ||
//     !weight ||
//     !location ||
//     !status
//   ) {
//     return res.status(400).send({ message: "All fields are required" });
//   }

//   try {
//     const newPet = await PetModel.create({
//       petName,
//       //   petCategory,
//       image,
//       age,
//       sex,
//       size,
//       weight,
//       description,
//       location,
//       status,
//     });
//     res.status(201).send({ message: "Pet created successfully", newPet });
//   } catch (error) {
//     console.log(error);

//     res.status(500).send({ message: "Failed to create pet" });
//   }
// };

import { PetModel } from "../../src/database/models/petModel"; // PetModel импортлох

export const petCreate = async (req: any, res: any) => {
  const {
    petName,
    image,
    description,
    age,
    sex,
    size,
    weight,
    location,
    status,
  } = req.body;

  if (
    !petName ||
    !image ||
    !description ||
    !age ||
    !sex ||
    !size ||
    !weight ||
    !location ||
    !status
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const newPet = await PetModel.create({
      petName,
      image,
      description,
      age,
      sex,
      size,
      weight,
      location,
      status,
    });
    res.status(201).send({ message: "Pet created successfully", newPet });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create pet" });
  }
};
