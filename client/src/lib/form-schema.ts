import { zip } from "lodash";
import { z } from "zod";

export const petSchema = z.object({
  petCategoryId: z.enum(
    [
      "67318ef682933a1de42fa5d9",
      "67318f2082933a1de42fa5db",
      "67318fc782933a1de42fa5dd",
      "67318fcc82933a1de42fa5df",
      "673575da1ecf70ca44174ba2",
      "6735760a1ecf70ca44174ba6",
      "673576141ecf70ca44174ba8",
    ],
    {
      message: "Амьтны төрөл сонгоно уу",
    }
  ),
  petName: z
    .string()
    // .min(2, { message: "petName must be at least 2 characters." })
    // .max(50, { message: "petName must be no more than 50 characters." })
    .refine((value) => value != "" || value.length >= 2, {
      message: "хамгийн багадаа 2 тэмдэгттэй байх ёстой.",
    })
    .refine((value) => value === "" || value.length <= 50, {
      message: "50 тэмдэгтээс хэтрэхгүй байх ёстой.",
    }),
  age: z
    .string()
    .min(0, { message: "Нас эерэг тоо байх ёстой." })
    .max(100, { message: "Нас 100-оос дээшгүй байх ёстой." }),

  size: z.enum(["Жижиг", "Дунд", "Том"], {
    message: "Хэмжээ нь жижиг, дунд эсвэл том хэмжээтэй байх ёстой.",
  }),

  weight: z
    .string()
    .min(1, { message: "Жин хамгийн багадаа 1 тэмдэгт байх ёстой." })
    .max(50, { message: "Жин нь 50 тэмдэгтээс хэтрэхгүй байх ёстой." }),

  location: z
    .string()
    .min(2, { message: "Байршил хамгийн багадаа 2 тэмдэгт байх ёстой." })
    .max(50, { message: "Байршил 50 тэмдэгтээс хэтрэхгүй байх ёстой." }),

  isVaccined: z.enum(["Тийм", "Үгүй"], {
    message: "Тийм,Үгүй сонгох",
  }),

  status: z.enum(
    ["Үрчлүүлэх боломжтой", "Одоогоор хүлээгдэж байгаа", "Үрчлэгдсэн"],
    { message: "Төлөв нь урьдчилан тодорхойлсон утгуудын нэг байх ёстой." }
  ),
  sex: z.enum(["Эр", "Эм"], {
    message: "Хүйс сонгоно уу",
  }),
  description: z
    .string()
    .min(2, { message: "тайлбар дор хаяж 2 тэмдэгт байх ёстой." })
    .max(100, { message: "тайлбар 100 тэмдэгтээс хэтрэхгүй байх ёстой." }),
});
