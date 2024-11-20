import { z } from "zod";

export const petSchema = z.object({
  petName: z
    .string()
    .min(2, { message: "petName must be at least 2 characters." })
    .max(50, { message: "petName must be no more than 50 characters." }),

  petCategoryId: z
    .string()
    .min(1, { message: "petCategoryId must be at least 2 characters." }),

  age: z
    .string()
    .min(0, { message: "Age must be a positive number." })
    .max(20, { message: "Age must be no more than 20." }),

  size: z.enum(["Small", "Medium", "Large"], {
    message: "Size must be one of Small, Medium, or Large.",
  }),

  weight: z
    .string()
    .min(2, { message: "Weight must be at least 2 characters." })
    .max(50, { message: "Weight must be no more than 50 characters." }),

  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." })
    .max(50, { message: "Location must be no more than 50 characters." }),

  isVaccined: z.enum(["Тийм", "Үгүй", "Хараахан хийлгэж амжаагүй"], {
    message: "isVaccined must be one of the predefined values.",
  }),

  status: z.enum(
    ["Үрчлүүлэх боломжтой", "Одоогоор хүлээгдэж байгаа", "Үрчилэгдсэн"],
    { message: "Status must be one of the predefined values." }
  ),
  sex: z.enum(["Male", "Female"], {
    message: "Sex must be one of the predefined values.",
  }),
  description: z
    .string()
    .min(2, { message: "description must be at least 2 characters." })
    .max(50, { message: "description must be no more than 50 characters." }),
});
