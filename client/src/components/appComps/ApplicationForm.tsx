"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
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
    {
      id: 8,
      text: "Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа уу?",
    },
  ];

  const [isChildPresent, setIsChildPresent] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<{
    [id: number]: string | boolean;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleCheckboxChange = () => {
    setIsChildPresent(!isChildPresent);
    setInputValues((prev) => ({
      ...prev,
      8: !isChildPresent,
    }));
  };

  const handleInputChange = (id: number, value: any) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submit = () => {
    for (const question of questions) {
      const inputValue = inputValues[question.id];

      if (
        question.id !== 8 &&
        (inputValue === "" || inputValue === undefined)
      ) {
        setErrorMessage("Бүх асуултад хариулт бичнэ үү!");
        return;
      }
    }

    setErrorMessage("");
    console.log("Form Data: ", inputValues);
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-orange-300 border-solid border-2 rounded-2xl p-3 ">
      <div className="flex flex-col gap-5 ">
        {questions.map((question, index) => {
          if (question.id == 8) {
            return (
              <div
                key={index}
                className="flex justify-center items-center gap-5"
              >
                <label>
                  {question.id}.{question.text}
                </label>
                <Checkbox
                  checked={isChildPresent}
                  onClick={handleCheckboxChange}
                  className="w-5 h-5 rounded-[5px]"
                />
              </div>
            );
          }
          return (
            <div key={index} className="w-100vw ">
              <p>
                {question.id}. {question.text}
              </p>
              <Input
                id={`input-${question.text}`}
                value={String(inputValues[question.id] || "")}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                required
                type="text"
              />
            </div>
          );
        })}
      </div>
      {errorMessage && (
        <div className="text-red-500 mt-2">
          <p>{errorMessage}</p>
        </div>
      )}

      <Button
        onClick={submit}
        className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-[200px]"
      >
        Үргэлжлүүлэх
      </Button>
    </div>
  );
}
