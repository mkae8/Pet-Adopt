import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionSelectProps {
  question: {
    id: string;
    number: string;
    text: string;
  };
  value: string;
  onChange: (value: string) => void;
}

export function QuestionSelect({
  question,
  value,
  onChange,
}: QuestionSelectProps) {
  return (
    <div className="space-y-2 flex flex-col gap-4">
      <label
        htmlFor={question.id}
        className="block text-sm font-medium text-gray-700"
      >
        {question.number}. {question.text}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={question.id} className="w-full ">
          <SelectValue placeholder="Сонгох" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Тийм">Тийм</SelectItem>
          <SelectItem value="Үгүй">Үгүй</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
