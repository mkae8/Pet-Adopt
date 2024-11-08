"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
}

interface Question {
  [key: number]: string;
}

export default function ApplicationForm() {
  const questions: Question[] = [
    { id: 1, text: "Танд яагаад амьтан үрчлэн авах сонирхол төрсөн бэ?" },
    { id: 2, text: "Таны амьдрах орчин ямар вэ?" },
    { id: 3, text: "Танд өөр амьтад бий юу?" },
    {
      id: 4,
      text: "Өмнө нь амьтан тэжээж байсан уу? Хэрэв тийм бол юу болсон бэ?",
    },
    { id: 5, text: "Өдөр бүр амьтанд хэр их цаг зарцуулах боломжтой вэ?" },
    {
      id: 6,
      text: "Хэрэв та аялалд гарах эсвэл удаан хугацаагаар хол байх шаардлага гарвал амьтандаа хэрхэн анхаарал тавих төлөвлөгөөтэй вэ?",
    },
    {
      id: 7,
      text: "Амьтны хоол, малын эмчид үзүүлэх, яаралтай тусламж зэрэг зардлуудад санхүүгийн хувьд бэлтгэлтэй юу?",
    },
  ];

  const [isChildPresent, setIsChildPresent] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChildPresent(!isChildPresent);
  };

  const submit = () => {
    console.log("hello");
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-red-100 border-solid border-2 rounded-2xl p-3 ">
      <div className="flex flex-col gap-5">
        {questions.map((question, index) => {
          return (
            <div key={index} className="w-100vw">
              <p>
                {question.id}. {question.text}
              </p>
              <Input required className="bg-green-100" type={""} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-5">
        <label>8. Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа уу?</label>
        <Checkbox
          checked={isChildPresent}
          onChange={handleCheckboxChange}
          onClick={handleCheckboxChange}
          className="w-5 h-5 rounded-[5px]"
        />
      </div>
      <Button
        onClick={submit}
        className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-1/5"
      >
        Үргэлжлүүлэх
      </Button>
    </div>
  );
}
