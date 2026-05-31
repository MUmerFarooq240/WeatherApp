import React, { useRef } from "react";
import image from "../image/image.png";
import "./Hourlyforcast.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Hourlyforcast({ hourlyData }) {
  const scrollRef = useRef(null);

  //scroll function (Bina if condition ke, jaisa tutorial mein tha)
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  return (
    <div className="relative mt-6">
      <div
        ref={scrollRef}
        className="flex gap-4 mx-10 py-2 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center shadow-lg bg-green-100 py-2 px-4 rounded"
          >
            <p>{new Date(hour.time).getHours()}:00</p>
            <img
              src={hour.condition.icon}
              alt="weather icon"
              className="w-20 mx-auto"
            />
            <p>{hour.temp_c}°C</p>
          </div>
        ))}
      </div>
      {/* scroll buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-2/5 bg-green-400 rounded-full text-white w-5 h-5 transition flex justify-center items-center cursor-pointer"
      >
        <FaChevronLeft className="w-4 " />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-2/5 bg-green-400 rounded-full text-white w-5 h-5 transition flex justify-center items-center cursor-pointer"
      >
        <FaChevronRight className="w-4 " />
      </button>
    </div>
  );
}

export default Hourlyforcast;
