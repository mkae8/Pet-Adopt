"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "../Loading";

import { Button } from "@/components/ui/button";
import { QuestionSelect } from "../mkae/QuestionSelect";
import { QuestionInput } from "../mkae/QuestionInput";

interface Question {
  id: string;
  number: string;
  text: string;
}

const questions: Question[] = [
  {
    id: "question1",
    number: "1",
    text: "Танд яагаад амьтан үрчлэн авах сонирхол төрсөн бэ?",
  },
  { id: "question2", number: "2", text: "Таны амьдрах орчин ямар вэ?" },
  { id: "question3", number: "3", text: "Танд өөр амьтад бий юу?" },
  {
    id: "question4",
    number: "4",
    text: "Өмнө нь амьтан тэжээж байсан уу? Хэрэв тийм бол юу болсон бэ?",
  },
  {
    id: "question5",
    number: "5",
    text: "Өдөр бүр амьтанд хэр их цаг зарцуулах боломжтой вэ?",
  },
  {
    id: "question6",
    number: "6",
    text: "Хэрэв та аялалд гарах эсвэл удаан хугацаагаар хол байх шаардлага гарвал амьтандаа хэрхэн анхаарал тавих төлөвлөгөөтэй вэ?",
  },
  {
    id: "question7",
    number: "7",
    text: "Амьтны хоол, малын эмчид үзүүлэх, яаралтай тусламж зэрэг зардлуудад санхүүгийн хувьд бэлтгэлтэй юу?",
  },
  {
    id: "question8",
    number: "8",
    text: "Танай өрхөд хүүхэд эсвэл бусад хараат хүн байгаа уу?",
  },
];

export default function ApplicationForm() {
  const paramName = useSearchParams();
  const petId: string | null = paramName.get("petId");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const [inputValues, setInputValues] = useState<{
    [id: string]: string | null | undefined;
  }>({
    petId: petId,
    userId: user?.id,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const back = () => {
    router.push("/petcard?filter=бүгд");
  };

  const submit = async () => {
    setLoading(true);
    for (const question of questions) {
      const inputValue = inputValues[question.id];

      if (inputValue === "" || inputValue === undefined) {
        setErrorMessage("Бүх асуултад хариулт бичнэ үү!");
        setLoading(false);
        return;
      }
    }
    setErrorMessage("");

    try {
      await axios.post(`${process.env.BACKEND_URL}/applicationForm`, {
        ...inputValues,
      });
      setLoading(false);
      toast({
        title: "Амжилттай",
        description: "мэдээлэл илгээлээ",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Алдаа гарлаа",
        description: "Дахин оролдоно уу",
      });
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <Loading />
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 bg-white border rounded-lg">
        <div className="max-w-4xl mx-auto  overflow-hidden ">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2">
              Үрчлэгчийн мэдээлэл
            </h1>
            <p className="text-gray-500 text-center mb-8">
              /Таны бөглөсөн мэдээллийг амьтны эзэн харах болно/
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {questions.map((question) =>
                question.id === "question8" ? (
                  <QuestionSelect
                    key={question.id}
                    question={question}
                    value={inputValues[question.id] as string}
                    onChange={(value) => handleInputChange(question.id, value)}
                  />
                ) : (
                  <QuestionInput
                    key={question.id}
                    question={question}
                    value={inputValues[question.id] as string}
                    onChange={(value) => handleInputChange(question.id, value)}
                  />
                )
              )}
            </div>
            {errorMessage && (
              <div className="text-red-500 mt-4 text-center">
                <p className="text-xl font-semibold">{errorMessage}</p>
              </div>
            )}
            <div className="flex justify-between mt-8">
              <Button
                onClick={back}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Буцах
              </Button>
              <Button
                onClick={submit}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
              >
                Үргэлжлүүлэх
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
