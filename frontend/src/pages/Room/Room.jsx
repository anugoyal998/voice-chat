import React from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import RoomNavigation from "./RoomNavigation";

const Room = () => {
  const [searchParams] = useSearchParams();
  const roomID = searchParams.get("roomID");
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
        className="w-full bg-bgTertiary rounded-tl-2xl rounded-tr-2xl"
        style={{ height: "calc(100vh - 150px - 1rem)" }}
      ></div>
    </>
  );
};

export default Room;
