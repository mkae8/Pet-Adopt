import { Request, Response } from "express";
import { PetModel } from "../../src/database/models/petModel";

export const statusUpdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, newStatus } = req.body;

  // Validate input
  if (!id || !newStatus) {
    res.status(400).send({ message: "ID and newStatus are required" });
    return;
  }

  try {
    // Find the pet by ID
    const pet = await PetModel.findById(id);

    if (!pet) {
      res.status(404).send({ message: "Pet not found" });
      return;
    }

    // Update the pet's status
    const updateResult = await PetModel.updateOne(
      { _id: id },
      { $set: { status: newStatus } }
    );

    if (updateResult.modifiedCount === 0) {
      res.status(400).send({ message: "No changes made to the pet's status" });
      return;
    }

    // Success response
    res
      .status(200)
      .send({ message: `Амьтны төлөв шинэчлэгдлээ : ${newStatus}` });
  } catch (error) {
    console.error("Error updating pet status:", error);
    res
      .status(500)
      .send({ message: "An error occurred while updating the pet's status" });
  }
};
