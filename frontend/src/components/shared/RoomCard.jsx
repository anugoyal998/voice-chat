import React from "react";
import { BsChatFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import {useNavigate} from 'react-router-dom'

const RoomCard = ({ room }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-bgSecondary p-[20px] rounded-[6px] cursor-pointer" onClick={()=> navigate(`/room/${room.id}`)}  >
      <h3 className="text-lg truncate font-medium">{room.topic}</h3>
      <div className={`flex items-center relative my-[20px]`}>
        <div className="avatars">
          {room.speakers.map((speaker) => {
            return (
              <img
                key={speaker.id}
                src={speaker.avatar}
                alt="avatar"
                className={`w-[40px] h-[40px] rounded-full object-fit border-2 border-success ${
                  room.speakers.length === 1 ? "initial" : "absolute"
                } ${
                  speaker.id === 1 ? "top-0 left-0" : "top-[15px] left-[15px]"
                } bg-bgSecondary`}
              />
            );
          })}
        </div>
        <div className="ml-[100px]">
          {room.speakers.map((speaker) => {
            return (
              <div className="flex space-x-1 items-center" key={speaker.id}>
                <span claasName="capitalize pb-[5px]">{speaker.name}</span>
                <BsChatFill />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end items-center space-x-1">
        <span className="font-medium">{room.totalPeople}</span>
        <FiUser className="stroke-[3px]" />
      </div>
    </div>
  );
};

export default RoomCard;
