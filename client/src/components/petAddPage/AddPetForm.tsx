"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

// Zod схемийг тодорхойлох
const animalAdoptionSchema = z.object({
  name: z.string().min(1, { message: "Нэр оруулна уу" }),
  age: z
    .number()
    .min(0, { message: "Нас 0-оос их байна" })
    .max(30, { message: "Нас 30-оос бага байна" }),
  breed: z.string().min(1, { message: "Үүлдэр оруулна уу" }),
  information: z.string().min(1, { message: "Тайлбар оруулна уу" }),
  email: z.string().email({ message: "Буруу имэйл хаяг" }),
  phone: z.string().min(1, { message: "Утасны дугаар оруулна уу" }),
  image: z.string().url({ message: "Зураг оруулна уу" }),
});

type AnimalAdoptionForm = z.infer<typeof animalAdoptionSchema>;

const AddPetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AnimalAdoptionForm>({
    resolver: zodResolver(animalAdoptionSchema),
  });

  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // Cloudinary-д зураг оруулах процесс
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset"); // Cloudinary upload preset ашиглах
      formData.append("cloud_name", "your_cloud_name"); // Cloudinary cloud name ашиглах

      fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setImageUrl(data.secure_url); // Cloudinary-аас ирсэн URL
          setValue("image", data.secure_url); // `react-hook-form` дээр image URL-ийг хадгалах
        })
        .catch((err) => console.error("Error uploading image:", err));
    }
  };

  const onSubmit = (data: AnimalAdoptionForm) => {
    console.log(data);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="border border-red-500 rounded-md p-3 text-white bg-red-600 hover:bg-red-700 transition duration-300">
          ҮРЧЛҮҮЛЭХ BUTTON
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-gray-800 flex  text-center">
              Та үрчлүүлэх амьтны нэр болон бусад шаардлагатай мэдээллийг
              бөглөнө үү.
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Хоёр хэсэгтэй flexbox layout */}
              <div className="flex space-x-8">
                {/* Амьтны мэдээлэл (зүүн тал) */}
                <div className="w-1/2 space-y-4">
                  <div>
                    <label className="block text-gray-700">Амьтны нэр</label>
                    <input
                      type="text"
                      {...register("name")}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700">Амьтны нас</label>
                    <input
                      type="number"
                      {...register("age")}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.age && (
                      <span className="text-red-500 text-sm">
                        {errors.age.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700">Үүлдэр</label>
                    <input
                      type="text"
                      {...register("breed")}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.breed && (
                      <span className="text-red-500 text-sm">
                        {errors.breed.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700">
                      Бусад мэдээлэл
                    </label>
                    <textarea
                      {...register("information")}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.information && (
                      <span className="text-red-500 text-sm">
                        {errors.information.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Үрчлүүлэгчийн мэдээлэл (баруун тал) */}
                <div className="w-1/2 space-y-4">
                  <div>
                    <label className="block text-gray-700">Имэйл</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700">Утасны дугаар</label>
                    <input
                      type="text"
                      {...register("phone")}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Зураг оруулах хэсэг */}
                  <div>
                    <label className="block text-gray-700">
                      {" "}
                      Амьтны зурагийг оруулах
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {imageUrl && (
                      <div className="mt-2">
                        <CloudinaryContext cloudName="your_cloud_name">
                          <Image publicId={imageUrl}>
                            <Transformation
                              width="200"
                              height="200"
                              crop="fill"
                            />
                          </Image>
                        </CloudinaryContext>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Үрчлүүлэх болон буцах */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full bg-green-500 text-white hover:bg-green-600 hover:text-white"
                >
                  Үрчлүүлэх
                </Button>
                <Button variant="outline" className="w-full">
                  Буцах
                </Button>
              </div>
            </form>
          </AlertDialogDescription>

          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
// aa
export default AddPetForm;
