const Test = () => {
  return (
    <>
      <div className="relative group w-32 h-12">
        <button className="bg-orange-500 text-white font-semibold w-full h-full rounded-full relative overflow-hidden">
          Donate
        </button>

        <div className="absolute top-0 -left-3 w-8 h-8 bg-black rounded-full transform group-hover:scale-125 transition-transform duration-300"></div>
      </div>
    </>
  );
};

export default Test;
