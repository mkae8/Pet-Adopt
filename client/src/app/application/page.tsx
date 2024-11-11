import Application from "../../components/appComps/ApplicationForm";

const AppQeustions = () => {
  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/wallpaper3.jpeg')" }}
    >
      <div className="sm:w-[500px] lg:w-[1000px] md:w-[600px] m-auto  rounded-xl shadow-2xl">
        <Application />
      </div>
    </div>
  );
};

export default AppQeustions;
