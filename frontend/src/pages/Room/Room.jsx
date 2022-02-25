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
  const { user } = useSelector((state) => state.auth);
  const [room,setRoom] = useState()
  const socket = useRef()
  const userMedia = useRef()
  const peersRef = useRef([])
  const [peers,setPeers] = useState([])
  // get Room
  useEffect(() => {
    async function fetch() {
      await errorHandler(async () => {
        const { data } = await getRoom({ roomID });
        setRoom(data?.room?.[0]);
      }, `frontend\src\pages\Room\Room.jsx`);
    }
    fetch();
  }, [roomID]);

  // peer
  const createPeer = (userToSignal, callerID, stream, user)=> {
	  const peer = new Peer({
		initiator: true,
		trickle: false,
		stream,
	  })
	  peer.on('signal',signal => {
		//   console.log(signal,"signal")
		socket.current.emit('sending signal',{userToSignal, callerID, signal,user})
	  })
	  return peer
  }

  const addPeer = (incomingSignal, callerID, stream, user) => {
	  const peer = new Peer({
		initiator: false,
		trickle: false,
		stream,
	})

	peer.on('signal',signal => {
		socket.current.emit('returning signal',{signal,callerID,user})
	})

	peer.signal(incomingSignal)

	return peer
  }
  // peer
  // rtc
  useEffect(() => {
	  if(!roomID || !room)return
    socket.current = io(process.env.REACT_APP_API_URL)
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then(stream=> {
		if(userMedia.current){
			userMedia.current.srcObject = stream
			userMedia.current.volume = 0
		}
		socket.current.emit("join room",roomID,user)
		socket.current.on("all users", payload=> {
			// console.log(payload,"payload")
			let arr = []
			peersRef.current = []
			payload.forEach(ele=> {
				const peer = createPeer(ele.socketID,socket.current.id,stream,ele.user) 
				// other user socket id, current user socket id, current user stream
				peersRef.current.push({
					peerID: ele.socketID,
					peer,
					user: ele.user
				})
				arr.push({peerID: ele.socketID, peer, user: ele.user})
			})
			setPeers(arr)
		})

		socket.current.on("user joined", payload=> {
			const peer = addPeer(payload.signal,payload.callerID,stream,payload.user)
			peersRef.current.push({
				peerID: payload.callerID,
				peer,
				user: payload.user
			})

			setPeers(prev=> [...prev, {peerID: payload.callerID, peer, user: payload.user}])
		})

		socket.current.on('receiving returned signal',payload=> {
			const item = peersRef.current.find(p=> p.peerID === payload.id)
			item?.peer.signal(payload.signal)
		})

    })

	return ()=> {
		socket.current.emit('user left',{user,roomID})
	}

  },[roomID,room])
  // browser leave
  window.addEventListener("beforeunload",e=> {
	  e.preventDefault()
	  socket.current.emit('user left',{user,roomID})
  })

  // rtc
  // user joined
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
		<audio ref={userMedia} autoPlay controls playsInline />

		{
			peers?.map((e,index)=> {
				return <Audio key={index} data={e} />
			})
		}


      </div>
    </>
  );
};

const Audio = ({data})=> {
	const {peer,peerID,user} = data
	const ref = useRef()
	useEffect(()=> {
		if(ref.current){
			ref.current.srcObject = peer.streams[0]
		}
	},[])
	return(
		<audio ref={ref} autoPlay controls playsInline />
	)
}


export default Room;
