import React from "react";
import { logout } from "../../http";
import {useDispatch, useSelector} from 'react-redux'
import {setAuth} from '../../store/authSlice'

const Navigation = () => {
  const dispatch =  useDispatch()
  const {isAuth}  = useSelector(state => state.auth)
  const logoutUser = async ()=> {
    try {
      const {data} = await logout()
      dispatch(setAuth(data))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="py-2 flex items-center">
      <div className="w-[90vw] mx-auto text-lg font-semibold">
        👋🏼 Voice Chat
      </div>
      {isAuth && <button className="bg-white text-black"onClick={logoutUser}>logout</button>}
    </div>
  );
};

export default Navigation;
