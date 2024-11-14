"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
}

export default function ApplicationForm() {
  const paramName = useSearchParams();
  const petId: string | null = paramName.get("petId");

  const questions: Question[] = [
    {
      id: "question1",
      text: "Танд яагаад амьтан үрчлэн авах сонирхол төрсөн бэ?",
    },
    { id: "question2", text: "Таны амьдрах орчин ямар вэ?" },
    { id: "question3", text: "Танд өөр амьтад бий юу?" },
    {
      id: "question4",
      text: "Өмнө нь амьтан тэжээж байсан уу? Хэрэв тийм бол юу болсон бэ?",
    },
    {
      id: "question5",
      text: "Өдөр бүр амьтанд хэр их цаг зарцуулах боломжтой вэ?",
    },
    {
      id: "question6",
      text: "Хэрэв та аялалд гарах эсвэл удаан хугацаагаар хол байх шаардлага гарвал амьтандаа хэрхэн анхаарал тавих төлөвлөгөөтэй вэ?",
    },
    {
      id: "question7",
      text: "Амьтны хоол, малын эмчид үзүүлэх, яаралтай тусламж зэрэг зардлуудад санхүүгийн хувьд бэлтгэлтэй юу?",
    },
    {
      id: "question8",
      text: "Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа уу?",
    },
  ];

  const { user } = useUser();
  const { toast } = useToast();

  const [inputValues, setInputValues] = useState<{
    [id: string]: string | null | undefined;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setInputValues((prev) => ({
      ...prev,
      question8: value,
    }));
  };

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submit = async () => {
    // Validate inputs before submission
    let formValid = true;
    for (const question of questions) {
      const inputValue = inputValues[question.id];

      // Check if any of the required questions are empty
      if (
        question.id !== "question8" &&
        (!inputValue || inputValue.trim() === "")
      ) {
        setErrorMessage("Бүх асуултад хариулт бичнэ үү!");
        formValid = false;
        break;
      }
    }

    // If form is invalid, return early
    if (!formValid) return;

    setErrorMessage(""); // Reset any previous error messages

    // Include petId and userId
    const formData = {
      ...inputValues,
      petId: petId || undefined, // Avoid null values
      userId: user?.id,
    };

    try {
      await axios.post("https://localhost:8000/applicationForm", formData);

      toast({
        title: "Амжилттай илгээгдлээ",
        description: "Таны хүсэлт амжилттай илгээгдлээ!",
      });
    } catch (error) {
      toast({
        title: "Алдаа гарлаа",
        description: "Дахин оролдож үзнэ үү.",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-orange-300 border-solid border-2 rounded-2xl p-3 ">
      <div className="flex flex-col gap-5 ">
        {questions.map((question, index) => {
          if (question.id === "question8") {
            return (
              <div
                key={index}
                className="flex justify-start items-center gap-5"
              >
                <label>
                  {question.id}. {question.text}
                </label>
                <Select
                  value={selectedValue}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Тийм">Тийм</SelectItem>
                      <SelectItem value="Үгүй">Үгүй</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
