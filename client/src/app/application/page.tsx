import { Suspense } from "react";
import ApplicationForm from "../../components/appComps/ApplicationForm";

const AppQeustions = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-around object-contain relative ">
      <div
        className="absolute inset-0 bg-black opacity-30"
        style={{
          backgroundImage: "url('/wallpaper3.jpeg')",
          zIndex: -1,
        }}
      />

      <div className="sm:w-[500px] lg:w-[1000px] md:w-[600px] m-auto rounded-xl shadow-2xl relative z-10 flex">
        <Suspense fallback={<div>Loading...</div>}>
          <ApplicationForm />
        </Suspense>
      </div>
    </div>
  );
};

export default AppQeustions;
