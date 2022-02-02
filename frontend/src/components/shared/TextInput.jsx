import React from "react";

const TextInput = (props) => {
  return (
    <div>
      <input
        type="text"
        {...props}
        className="bg-bgHr border-none py-1 px-4 w-[200px] text-textPrimary text-[18px] rounded-md outline-none focus:outline-none"
      />
    </div>
  );
};

export default TextInput;
