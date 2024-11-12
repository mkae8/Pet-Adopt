import { PetModel } from "../../src/database/models/petModel";

export const fetchPets = async (req: any, res: any): Promise<void> => {
  try {
    const pets = await PetModel.find().populate("petCategory");
    console.log(pets);

    res.status(200).send(pets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch pets" });
  }
};
