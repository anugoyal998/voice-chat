import React, { useEffect } from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import RoomCard from "../../components/shared/RoomCard";
import { getAllRooms } from "../../http";
import errorHandler from "../../utils/errorHandler"

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms,setRooms] = useState([]);
  const openModal = ()=> {
    setShowModal(true);
  }
  useEffect(()=> {
    async function fetch(){
      try {
        const {data} = await getAllRooms()
        setRooms(data)
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetch()
  },[])
  return (
    <>
      <div className="mt-4 px-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-[20px] font-semibold heading">
              All voice rooms
            </span>
            <div className="bg-bgSecondary ml-[20px] flex items-center px-[15px] min-w-[300px] rounded-[20px]">
              <BiSearch className="text-2xl" />
              <input
                type="search"
                className="bg-bgSecondary border-none outline-none focus:outline-none p-[10px] text-textPrimary w-full"
              />
            </div>
          </div>
          <div className="right">
            <button
              className="flex items-center bg-success py-[5px] px-[20px] rounded-[20px] text-textPrimary space-x-2 hover:opacity-90 animation"
              onClick={openModal}
            >
              <FiUserPlus className="text-textPrimary text-lg stroke-[3px]" />
              <span className="font-semibold text-[1rem]">Start a room</span>
            </button>
          </div>
        </div>
      </div>
      {showModal && <AddRoomModal onClose={()=> setShowModal(false)}  />}
    </>
  );
};

export default Rooms;
