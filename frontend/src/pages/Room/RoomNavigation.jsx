import React from "react";
import { BiArrowBack } from "react-icons/bi";

const RoomNavigation = () => {
  return (
    <div className="px-16 mt-5 flex space-x-2 items-center">
      <div>
        <BiArrowBack className="text-lg"/>
      </div>
      <span className="font-medium heading">All voice rooms</span>
    </div>
  );
};

export default RoomNavigation;
