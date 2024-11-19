import { PawPrintIcon as Paw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Test = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-pink-100">
      <Button className="group relative overflow-hidden rounded-full bg-purple-500 px-8 py-4 text-xl font-bold text-white transition-all duration-300 ease-out hover:bg-pink-500 hover:shadow-lg active:scale-95">
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Paw className="h-6 w-6" />
          <span>Adopt a Pet</span>
        </span>
        <span className="absolute bottom-0 left-0 h-1 w-full bg-pink-300 transition-all duration-300 ease-out group-hover:h-full"></span>
      </Button>
    </div>
  );
};

export default Test;
