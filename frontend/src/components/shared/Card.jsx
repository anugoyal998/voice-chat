import React from "react";

const Card = ({ children }) => {
  return (
    <div className="w-[31.25rem] h-[300px] text-center max-w-[90%] bg-bgSecondary p-[1.875rem] rounded-md">
      {children}
    </div>
  );
};

export default Card;
