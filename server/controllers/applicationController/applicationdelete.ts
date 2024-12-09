import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/answerModel";
export const applicationdelete = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send({ message: "Хүсэлтийн ID-г өгнө үү" });
    return;
  }

  try {
    const application = await ApplicationModel.findById(id);
    if (!application) {
      res.status(404).send({ message: "Хүсэлт олдсонгүй" });
      return;
    }
    const deletionResult = await ApplicationModel.deleteOne({ _id: id });
    res.status(200).send({ message: "Хүсэлтийг амжилттай устгалаа" });

    if (deletionResult.deletedCount === 0) {
      res.status(404).send({ message: "Устгахаар хүсэлт олдсонгүй" });
      return;
    }
  } catch (error) {
    console.error("Хүсэлтийг устгахад алдаа гарлаа", error);
    res.status(500).send({ message: "Хүсэлтийг устгах явцад алдаа гарлаа" });
  }
};
