import { Input } from "@/components/ui/input";

interface QuestionInputProps {
  question: {
    id: string;
    number: string;
    text: string;
  };
  value: string;
  onChange: (value: string) => void;
}

export function QuestionInput({
  question,
  value,
  onChange,
}: QuestionInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={question.id}
        className="block text-sm font-medium text-gray-700"
      >
        {question.number}. {question.text}
      </label>
      <Input
        id={question.id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
        required
      />
    </div>
  );
}
