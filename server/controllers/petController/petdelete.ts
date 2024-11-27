import { Request, Response } from "express";
import { PetModel } from "../../src/database/models/petModel";
import { ApplicationModel } from "../../src/database/models/answerModel";
export const petdelete = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send({ message: "ID is required" });
    return;
  }

  try {
    const pet = await PetModel.findById(id);
    if (!pet) {
      res.status(404).send({ message: "Pet not found" });
      return;
    }
    const deletionResult = await PetModel.deleteOne({ _id: id });

    if (deletionResult.deletedCount === 0) {
      res.status(404).send({ message: "Pet not found for deletion" });
      return;
    }
    try {
      const application = await ApplicationModel.find({ petId: id });
      if (application) {
        const deletionResult = await ApplicationModel.deleteMany({ petId: id });
        res.status(200).send({ message: "Амжилттай устгалаа" });
        return;
      }
      res.status(200).send({ message: "Амжилттай устгалаа" });
    } catch (error) {
      console.error("Error deleting pet:", error);
      res
        .status(500)
        .send({ message: "An error occurred while deleting the pet" });
    }
  } catch (error) {
    console.error("Error deleting pet:", error);
    res
      .status(500)
      .send({ message: "An error occurred while deleting the pet" });
  }
};
