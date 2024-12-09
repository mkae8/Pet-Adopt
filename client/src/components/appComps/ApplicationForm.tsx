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
import { useRouter } from "next/navigation";
import { Loading } from "../Loading";

interface Question {
  id: string;
  number: string;
  text: string;
}

export default function ApplicationForm() {
  const paramName = useSearchParams();
  const petId: string | null = paramName.get("petId");
  const router = useRouter();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

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

  const { user } = useUser();
  const { toast } = useToast();

  const [inputValues, setInputValues] = useState<{
    [id: string]: string | null | undefined;
  }>({
    petId: petId,
    userId: user?.id,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setInputValues((prev) => ({
      ...prev,
      question8: value,
    }));
  };

  const handleInputChange = (id: string, value: any) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const back = () => {
    router.push("/petcard?filter=бүгд");
  };

  const submit = async () => {
    setLoading(false);
    for (const question of questions) {
      const inputValue = inputValues[question.id];

      if (
        question.id !== "question8" &&
        (inputValue === "" || inputValue === undefined || selectedValue === "")
      ) {
        setErrorMessage("Бүх асуултад хариулт бичнэ үү!");
        return;
      }

      setInputValues((prev) => ({
        ...prev,
      }));
    }
    setErrorMessage("");

    try {
      await axios.post(`${process.env.BACKEND_URL}/applicationForm`, {
        ...inputValues,
      });
      setLoading(false);
      toast({
        title: "Амжилттай",
        description: "Хүсэлт илгээгдлээ. Таны мэйл рүү хариу иртэл хүлээнэ үү",
      });
      push("/petcard?filter=бүгд");
    } catch (error) {
      toast({
        title: "aldaa zaalaa",
        description: "dahin oroldnu ",
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
      <div className="flex border-solid border-2 rounded-2xl ">
        <div className="flex flex-col items-center gap-4 rounded-2xl p-6 opacity-95 bg-white ">
          <div className=" mt-5 text-3xl font-bold">Үрчлэгчийн мэдээлэл</div>
          <div className="text-gray-500 ">
            /Таны бөглөсөн мэдээллийг амьтны эзэн харах болно/
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {questions.map((question, index) => {
              if (question.id == "question8") {
                return (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-5 w-full md:w-[48%]"
                  >
                    <label>
                      {question.number}.{question.text}*
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
                <div
                  key={index}
                  className="flex flex-col gap-2 bg-orange-200 rounded-sm p-1 w-full md:w-[48%]"
                >
                  <p>
                    {question.number}. {question.text}*
                  </p>
                  <Input
                    className="border-0 bg-orange-100"
                    id={`input-${question.text}`}
                    value={String(inputValues[question.id] || "")}
                    onChange={(e) =>
                      handleInputChange(question.id, e.target.value)
                    }
                    required
                    type="text"
                  />
                </div>
              );
            })}
          </div>

          {errorMessage && (
            <div className="text-red-500 mt-2">
              <p className="text-xl font-semibold">{errorMessage}</p>
            </div>
          )}
          <div className=" flex justify-between w-full">
            <Button
              onClick={back}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-[150px]"
            >
              Буцах
            </Button>
            <Button
              onClick={submit}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-[150px]"
            >
              Үргэлжлүүлэх
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
