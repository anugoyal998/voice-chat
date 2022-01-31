import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Button = ({ onClick }) => {

  return (
    <div className="flex justify-center">
      <button
        className="flex items-center space-x-2 bg-bgBlue py-1 px-3 rounded-2xl font-semibold cursor-pointer hover:opacity-90 animation"
        onClick={onClick}
      >
        <span>Get your username </span>{" "}
        <AiOutlineArrowRight className="text-xl" />
      </button>
    </div>
  );
};

export default Button;
