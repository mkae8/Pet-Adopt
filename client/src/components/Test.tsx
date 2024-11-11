"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface PetItem {
  petName: string;
  image: string;
  age: number;
  sex: string;
  size: string;
  weight: string;
  description: string;
  location: string;
  status: string;
}

export const Test = () => {
  const { toast } = useToast();
  const [petName, setPetName] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState<number>(0);
  const [sex, setSex] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    const newPetItem: PetItem = {
      petName,
      image,
      age,
      sex,
      size,
      weight,
      description,
      location,
      status,
    };

    if (
      !petName ||
      !image ||
      !age ||
      !sex ||
      !size ||
      !weight ||
      !description ||
      !location ||
      !status
    ) {
      toast({
        title: "hooson bn zaaaa",
        description: "dahin orold zaa ",
      });
      return;
    }

    console.log(process.env.BACKEND_URL);

    try {
      await axios.post(`http://localhost:8000/create/pet`, newPetItem);

      toast({
        title: "amjilttai yvuullaa zaaaa",
        description: "bolson  ",
      });
    } catch (error) {
      toast({
        title: "aldaa zaalaa",
        description: "dahin oroldnu ",
      });
      console.error(error);
    }
    console.log(newPetItem);
  };

  return (
    <div className=" flex gap-10 py-2 justify-center">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          Амьтны нэр
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Амьтны нэр"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <div>
          Zurag
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Зураг"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <div>
          nas
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Тамга"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <div>
          huis
          <input
            type="text"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            placeholder="Хүйс"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <div>
          size
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Хэмжээ"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <div>
          Jin
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Жин"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <div>
          Desc
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Тодорхойлолт"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <div>
          bairshil
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Байршил"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <div>
          status
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Төлөв"
            className="rounded-2xl border-solid border-gray-500 bg-slate-500"
          />
        </div>
        <button onClick={handleSubmit}>Амьтны мэдээлэл илгээх</button>
      </form>
    </div>
  );
};
