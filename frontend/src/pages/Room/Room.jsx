import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import { getRoom } from "../../http";
import RoomNavigation from "./RoomNavigation";
import errorHandler from "../../utils/errorHandler"

const Room = () => {
  const [searchParams] = useSearchParams();
  const roomID = searchParams.get("roomID");
  const [room,setRoom] = useState()
  useEffect(()=> {
    async function fetch(){
      await errorHandler(async()=> {
        const {data} = await getRoom(roomID)
        console.log(data)
      },`frontend\src\pages\Room\Room.jsx`)
    }
    fetch()
  },[roomID])
  if (!roomID) {
    return <Loader message="Loading...please wait..." />;
  }
  return (
    <>
      <div className="pt-5 h-[100px]">
        <hr className="opacity-30 mx-4" />
        <RoomNavigation />
      </div>
      <div
        className="w-full bg-bgTertiary rounded-tl-2xl rounded-tr-2xl pt-3 px-4"
        style={{ height: "calc(100vh - 150px - 1rem)" }}
      >
        <p></p>
      </div>
    </>
  );
};

export default Room;
