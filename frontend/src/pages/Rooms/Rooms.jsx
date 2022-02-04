import React, { useEffect } from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import RoomCard from "../../components/shared/RoomCard";
import { getAllRooms } from "../../http";

// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework best for backend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "http://localhost:5000/storage/1643871454771-207709675.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "http://localhost:5000/storage/1643872444261-600086395.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 2,
//     topic: "Which framework best for backend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "http://localhost:5000/storage/1643871454771-207709675.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "http://localhost:5000/storage/1643872444261-600086395.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: "Which framework best for backend?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "http://localhost:5000/storage/1643871454771-207709675.png",
//       },
//       {
//         id: 2,
//         name: "John Doe",
//         avatar: "http://localhost:5000/storage/1643872444261-600086395.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms,setRooms] = useState([]);
  useEffect(() => {
    async function fetch(){
      try {
        const {data} = await getAllRooms()
        console.log(data)
        setRooms(data.allRooms)
      } catch (error) {
        console.log(error);
      }
    }
    fetch()
  },[])
  const openModal = ()=> {
    setShowModal(true);
  }
  return (
    <>
      <div className="mt-4">
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
        <div className="grid grid-cols-4 gap-[20px] mt-[30px]">
          {rooms && rooms?.map((room) => {
            return <RoomCard room={room} key={room?.id} />;
          })}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={()=> setShowModal(false)}  />}
    </>
  );
};

export default Rooms;
