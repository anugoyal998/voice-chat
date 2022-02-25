import React, { useState } from "react";
import TextInput from "../shared/TextInput";
import { IoMdClose } from "react-icons/io";
import { createRoom as create } from "../../http";
import { ToastConfig } from "../../toast/toast-config";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AddRoomModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const createRoom = async () => {
    if (!topic) {
      toast("Please enter a topic", ToastConfig.errorDarkMode);
      return;
    }
    try {
      const { data } = await create({ roomName: topic, roomType });
      console.log(data.room);
      navigate(`/room?roomID=${data?.room?.roomID}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modalMask fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center ">
      <Toaster />
      <div className="modalBody w-[50%] max-w-[500px] bg-bgSecondary rounded-[20px] relative">
        <div
          className="absolute right-[10px] top-[8px] cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose className="text-2xl" />
        </div>
        <div
          className="modalHeader p-[30px]"
          style={{ borderBottom: "2px solid #262626" }}
        >
          <h3 className="mb-[5px] text-lg font-medium ">
            Enter the topic to be discussed
          </h3>
          <TextInput
            fullWidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className="subHeading my-[10px] font-semibold ">Room Type</h2>
          <div className="roomTypes grid grid-cols-3 gap-[30px]  ">
            <div
              className={`typeBox flex flex-col items-center ${
                roomType === "open" && "bg-bgInput"
              } p-[10px] rounded-[10px] cursor-pointer`}
              onClick={() => setRoomType("open")}
            >
              <img src="/img/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div
              className={`typeBox flex flex-col items-center ${
                roomType === "social" && "bg-bgInput"
              } p-[10px] rounded-[10px] cursor-pointer`}
              onClick={() => setRoomType("social")}
            >
              <img src="/img/users.png" alt="globe" />
              <span>Social</span>
            </div>
            <div
              className={`typeBox flex flex-col items-center ${
                roomType === "private" && "bg-bgInput"
              } p-[10px] rounded-[10px] cursor-pointer`}
              onClick={() => setRoomType("private")}
            >
              <img src="/img/lock.png" alt="globe" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className="modalFooter p-[30px] text-center ">
          <h2 className="modal-title mb-[20px] font-semibold">
            Start a room, open to everyone
          </h2>
          <button
            className="bg-success text-textPrimary py-[7px] px-[30px] rounded-[20px] hover:opacity-75 animation "
            onClick={createRoom}
          >
            {" "}
            🎉 Let's go{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
