"use client";

import React, { useRef, useState } from "react";
import { FaPaw } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";

const Testimonials = () => {
  type Testimonial = {
    name: string;
    role: string;
    image: string;
    text: string;
  };

  const testimonials: Testimonial[] = [
    {
      name: "Д.Алтаншагай",
      role: "FullStack developer",
      image: "./shagai.jpg",
      text: "Амьтан тэжээж эхлэхэд ойр дотнын хүн бүр л сөргөөр хүлээж авсан. Үр хүүхэд маань тэжээвэр амьтандаа маш их хайртай болсон.",
    },
    {
      name: "Х.Түвшинтэнгис",
      role: "Pinecone Student",
      image: "./tengis.jpg",
      text: "Амьтан тэжээхэд гэрийнхний эсэргүүцлээс гадна санхүүгийн асуудал их тулгардаг байсан. Хамгийн анхны цалингаа амьтдадаа зарцуулж байсан.",
    },
    {
      name: "Б.Тэмүүжин",
      role: "Pinecone Student",
      image: "./temuujin.jpg",
      text: "Гэртээ амьтан тэжээж эхэлснээс хойш миний амьдралд олон эерэг өөрчлөлт гарч байгаа. Одоо мөнгөө зөвхөн амьтан тэжээхдээ зарцуулдаг болсон.",
    },
    {
      name: "Б.Ганбат",
      role: "Pinecone Student",
      image: "./ganbat.jpg",
      text: "Би муурууддаа хамгийн сайн хоолыг нь авч өгдөг. Амьтан тэжээх болсноос хойш хуримтлуулсан мэдлэгээ олон хүмүүстэй хуваалцаж зөвлөгөө өгдөг. ",
    },
  ];

  const testimonialRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: "left" | "right", index: number) => {
    if (testimonialRef.current) {
      setSelectedScroll(index);
      const scrollAmount = 300; // Adjust this as needed for mobile
      const scrollByValue = direction === "left" ? -scrollAmount : scrollAmount;

      testimonialRef.current.scrollBy({
        left: scrollByValue,
        behavior: "smooth",
      });
    }
  };

  const [selectedScroll, setSelectedScroll] = useState(0);

  return (
    <div>
      <img src="./topfooter.png" alt="" className="w-full bg-[#f5f3eb]" />
      <div className="relative">
        <img
          className="w-screen h-[700px] object-fit "
          src="./footerbackground.png"
          alt=""
        />

        {/* Main content container */}
        <div className="container absolute top-20 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center justify-center text-center gap-10">
            <FaPaw className="h-[40px] w-[40px] text-orange-500" />
            <p className="text-3xl font-bold tracking-tighter text-orange-500">
              Амьтан үрчилж авсан хүмүүсийн сэтгэгдэл
            </p>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="container absolute top-72 left-1/2 overflow-hidden transform -translate-x-1/2 flex flex-col lg:flex-row justify-center gap-10 w-full max-w-[1000px]">
          <div
            ref={testimonialRef}
            className="flex justify-start gap-5 px-5 overflow-x-auto algabol"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col w-[500px] rounded-lg bg-white lg:flex-row gap-4"
              >
                <div className="min-w-[300px] w-[300px] lg:w-[480px] h-full  bg-white flex flex-col gap-5 p-4 rounded-lg shadow-md lg:h-[280px] ">
                  <div className="flex justify-center">
                    <div className="bg-orange-500 h-[90px] w-[90px] flex justify-center items-center rounded-full">
                      <img
                        className="h-[70px] w-[70px] rounded-full object-cover"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-base">{testimonial.text}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-xl font-bold tracking-tighter text-orange-500">
                          {testimonial.name}
                        </p>
                        <p>{testimonial.role}</p>
                      </div>
                      <IoIosAttach className="w-10 h-10 text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ul
          className="slick-dots absolute flex bottom-0 left-[50%] transform -translate-x-1/2 gap-1"
          role="tablist"
        >
          <li className="slick-active" role="presentation">
            <button
              onClick={() => scrollTestimonials("left", 0)}
              className={`ddd ${selectedScroll === 0 && "geeg"}`}
              type="button"
              role="tab"
              aria-label="Scroll left"
            >
              ←
            </button>
          </li>
          <li role="presentation">
            <button
              onClick={() => scrollTestimonials("right", 1)}
              className={`ddd ${selectedScroll === 1 && "geeg"}`}
              type="button"
              role="tab"
              aria-label="Scroll right"
            >
              →
            </button>
          </li>
        </ul>
      </div>
      <img src="./bottomshape.png" alt="" className="w-full bg-[#f5f3eb]" />
    </div>
  );
};

export default Testimonials;
