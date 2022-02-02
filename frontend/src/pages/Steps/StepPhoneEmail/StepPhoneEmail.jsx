import React, { useState } from "react";
import Email from "./Email";
import Phone from "./Phone";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({onNext}) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];
  return (
    <>
      <div className="flex justify-center items-center mt-[6rem]">
        <div>
          <div className="mb-[20px] flex items-center justify-end ">
            <button
              className={`border-none outline-none focus:outline-none rounded-[10px] cursor-pointer h-[50px] w-[50px] mx-2 ${type==='phone' ? "bg-bgBlue" : "bg-bgInput"} flex justify-center items-center`}
              onClick={() => setType("phone")}
            >
              <IoMdPhonePortrait className="text-3xl" />
            </button>
            <button
              className={`border-none outline-none focus:outline-none rounded-[10px] cursor-pointer h-[50px] w-[50px] mx-2 ${type==='email' ? "bg-bgBlue" : "bg-bgInput"} flex justify-center items-center`}
              onClick={() => setType("email")}
            >
              <MdEmail className="text-3xl" />
            </button>
          </div>
          <Component onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
