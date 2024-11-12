"use client";
import { useEffect } from "react";
import lottie from "lottie-web";

// Define the interface for component props (if any)
const DonateButton = () => {
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.querySelector("#lottie-animation") as Element, // Type assertion for TypeScript
      path: "https://cdn.prod.website-files.com/650c8bf165e85f360a9c0e52/655d3846627a8e8b092ea47d_Boton_04%20sin%20fondo%204.json", // URL of the animation
      renderer: "svg", // Use SVG renderer
      loop: true, // Set whether it should loop
      autoplay: false, // Do not autoplay until triggered
    });

    return () => {
      animation.destroy(); // Clean up animation when the component is unmounted
    };
  }, []);

  return (
    <a
      href="https://donate.territoriodezaguates.com/"
      target="_blank"
      className="relative inline-block w-full h-[155px]"
    >
      {/* The Lottie Animation */}
      <div
        id="lottie-animation"
        className="absolute top-0 left-0 w-full h-full"
      ></div>

      {/* Button Text */}
      <div className="relative z-10 flex justify-center items-center w-full h-full bg-regal-blue text-white text-lg font-bold uppercase px-4 py-2 rounded-md shadow-lg transition-all duration-300 ease-in-out hover:bg-light-pink">
        Donate
      </div>
    </a>
  );
};

export default DonateButton;
