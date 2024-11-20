import { PawPrintIcon as Paw, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Pet {
  image?: string;
  petName?: string;
  petCategoryId?: string;
  age?: number;
  sex?: string;
  size?: string;
  weight?: number;
  status?: string;
  vaccinated?: boolean;
  location?: string;
  description?: string;
}
interface PreviewCardProps {
  pet: Pet;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ pet }) => {
  return (
    <Card className="w-[450px] h-[450px] bg-white border-orange-200 shadow-lg overflow-hidden flex flex-col">
      <div className="relative h-48 bg-orange-100 flex-shrink-0">
        {pet.image ? (
          <img
            src={pet.image}
            alt={pet.petName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-orange-300">
            <Paw size={64} />
          </div>
        )}
      </div>
      <CardContent className="p-3 flex-grow overflow-y-auto">
        <h3 className="text-lg font-bold text-orange-700 mb-2 truncate">
          {pet.petName || "Pet name"}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <p>
            <span className="font-semibold text-orange-600">Төрөл:</span>{" "}
            {pet.petCategoryId || ""}
          </p>
          <p>
            <span className="font-semibold text-orange-600">Нас:</span>{" "}
            {pet.age || ""}
          </p>
          <p>
            <span className="font-semibold text-orange-600">Хүйс:</span>{" "}
            {pet.sex || ""}
          </p>
          <p>
            <span className="font-semibold text-orange-600">Хэмжээ:</span>{" "}
            {pet.size || ""}
          </p>
          <p>
            <span className="font-semibold text-orange-600">Жин:</span>{" "}
            {pet.weight || ""} kg
          </p>
          <p>
            <span className="font-semibold text-orange-600">Статус:</span>{" "}
            {pet.status || ""}
          </p>

          <p>
            <span className="font-semibold text-orange-600">Байршил:</span>{" "}
            {pet.location || ""}
          </p>
          <p>
            <span className="font-semibold text-orange-600">
              Вакцинд хамрагдсан эсэх:
            </span>{" "}
            {pet.vaccinated || ""}
          </p>
        </div>

        <div className="mt-2">
          <p className="text-xs text-gray-500 line-clamp-3">
            {pet.description || "Description..."}
          </p>
        </div>
      </CardContent>
      <div className="p-3 bg-orange-50 flex-shrink-0">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-1">
          <Heart className="w-3 h-3 mr-1" /> Adopt Me
        </Button>
      </div>
    </Card>
  );
};
export default PreviewCard;
