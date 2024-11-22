import { zip } from "lodash";
import { z } from "zod";

export const petSchema = z.object({
  petName: z
    .string()
    // .min(2, { message: "petName must be at least 2 characters." })
    // .max(50, { message: "petName must be no more than 50 characters." })
    .refine((value) => value != "" || value.length >= 2, {
      message: "petName must be at least 2 characters.",
    })
    .refine((value) => value === "" || value.length <= 50, {
      message: "petName must be no more than 50 characters.",
    }),

  petCategoryId: z
    .string()
    .min(1, { message: "petCategoryId must be at least 2 characters." }),

  age: z
    .string()
    .min(0, { message: "Age must be a positive number." })
    .max(100, { message: "Age must be no more than 20." }),

  size: z.enum(["Жижиг", "Дунд", "Том"], {
    message: "Size must be one of Small, Medium, or Large.",
  }),

  weight: z
    .string()
    .min(1, { message: "Weight must be at least 1 characters." })
    .max(50, { message: "Weight must be no more than 50 characters." }),

  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." })
    .max(50, { message: "Location must be no more than 50 characters." }),

  isVaccined: z.enum(["Тийм", "Үгүй"], {
    message: "isVaccined must be one of the predefined values.",
  }),

  status: z.enum(
    ["Үрчлүүлэх боломжтой", "Одоогоор хүлээгдэж байгаа", "Үрчлэгдсэн"],
    { message: "Status must be one of the predefined values." }
  ),
  sex: z.enum(["Эр", "Эм"], {
    message: "Sex must be one of the predefined values.",
  }),
  description: z
    .string()
    .min(2, { message: "description must be at least 2 characters." })
    .max(50, { message: "description must be no more than 50 characters." }),
});
