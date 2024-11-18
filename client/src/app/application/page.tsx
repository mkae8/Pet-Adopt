import { Suspense } from "react";
import ApplicationForm from "../../components/appComps/ApplicationForm";

const AppQeustions = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-around relative">
      <div
        className="absolute inset-0 bg-black opacity-30"
        style={{
          backgroundImage: "url('/wallpaper3.jpeg')",
          zIndex: -1,
        }}
      />
      <div className=" mt-20 text-3xl font-bold">Үрчлэгчийн мэдээлэл</div>
      <div className="sm:w-[500px] lg:w-[1000px] md:w-[600px] m-auto rounded-xl shadow-2xl relative z-10">
        <Suspense fallback={<div>Loading...</div>}>
          <ApplicationForm />
        </Suspense>
      </div>
    </div>
  );
};

export default AppQeustions;
