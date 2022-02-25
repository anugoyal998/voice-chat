import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import { getRoom } from "../../http";
import RoomNavigation from "./RoomNavigation";
import errorHandler from "../../utils/errorHandler";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Peer from "simple-peer";

const Room = () => {
  const [searchParams] = useSearchParams();
  const roomID = searchParams.get("roomID").toString();
  const [room, setRoom] = useState();
  const { user } = useSelector((state) => state.auth);
  const socket = useRef();
  const [userStream, setUserStream] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [newUserJoinedFlag, setNewUserJoinedFlag] = useState(false);
  // user permissions
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL);
    async function fetch() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setUserStream(stream);
    }
    fetch();
  }, []);

  // set user permissions
  useEffect(() => {
    if (!room) return;
    const ele = document.getElementById("userMedia");
    ele.srcObject = userStream;
    ele.volume = 0;
  }, [room]);

  // emit join room event
  useEffect(() => {
    socket.current.emit("join room", { roomID, user });
  }, [room, user, socket]);
  // create peer
  const createPeer = (userToSignal, callerID, stream, data) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socket.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        data,
      });
    });
    return peer;
  };
  // add Peer
  const addPeer = (incomingSignal, callerID, stream, data) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socket.current.emit("returning signal", { signal, callerID, data });
    });
    peer.signal(incomingSignal);
    return peer;
  };
  // get all users
  useEffect(() => {
    socket.current.on("all users", (data) => {
      // setAllUsers(data)
      const peers = [];
      data?.forEach((e) => {
        const peer = createPeer(e?.socketID, socket.current.id, userStream, e);
        peers.push({ peer, data: e, peerID: e?.socketID });
      });
      setAllUsers(peers);
    });
  }, []);
  // user joined
  useEffect(() => {
    socket.current.on("user joined", (payload) => {
      const peer = addPeer(
        payload?.signal,
        payload?.callerID,
        userStream,
        payload?.data
      );
    //   setAllUsers(prev=> [...prev,{peer,data: payload?.data, peerID: payload?.callerID}])
      setNewUserJoinedFlag((prev) => !prev);
    });
    socket.current.on("receiving returned signal", (payload) => {
      const item = allUsers?.find((p) => p.peerID === payload?.id);
      item?.peer.signal(payload?.signal);
    });
  }, []);
  // get room
  useEffect(() => {
    async function fetch() {
      await errorHandler(async () => {
        const { data } = await getRoom({ roomID });
        setRoom(data?.room?.[0]);
      }, `frontend\src\pages\Room\Room.jsx`);
    }
    fetch();
  }, [roomID, newUserJoinedFlag]);
  if (!roomID || !room) {
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
        <p className="capitalize text-xl font-semibold tracking-widest">
          {room?.roomName}
        </p>
        <audio id="userMedia" autoPlay playsInline controls />
		{
			allUsers?.map((curr,index)=> {
				return <Audio key={index} peer={curr?.peer} id={index} />
			})
		}
      </div>
    </>
  );
};

const Audio = ({peer,id}) => {
	// const [stream,setStream] = useState(null)
	// const [flag,setFlag] = useState(false)

	// const ref = useRef(null)
	// useEffect(() => {
	// 	setStream(prev=> peer.streams[0])
	// },[peer])

	// useEffect(() => {
	// 	if(!stream)return
	// 	setFlag(prev=> true)
	// 	const ele = document.getElementById(id)
	// 	ele.srcObject = stream
	// },[stream])

	// useEffect(() => {
	// 	if(flag === false)return
	// 	const ele = document.getElementById(id)
	// 	ele.srcObject = stream
	// },[flag,stream,peer,peer.streams])

	const ele = document.getElementById(id)

	useEffect(() => {
		peer.on('stream',stream => {
			console.log(stream)
		})
	})







	return(
		<audio id={id} playsInline autoPlay controls />
	)


};

export default Room;
