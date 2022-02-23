import React from "react";
import { logout } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { AiOutlineArrowRight } from "react-icons/ai";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const logoutUser = async () => {
    try {
      const {data} = await logout(); 
      dispatch(setAuth(data));
      localStorage.removeItem('at')
      localStorage.removeItem('rt')
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold">👋🏼 Voice Chat</div>
      {isAuth && (
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <h3 className="capitalize font-semibold w-20 truncate">
              {user?.name}
            </h3>
            <img
              src={user?.avatar ? user?.avatar : "https://picsum.photos/100"}
              alt="avatar"
              className="w-14 h-14 border-4 border-bgBlue rounded-full object-cover"
            />
          </div>
          <button
            className="border-none outline-none focus:outline-none cursor-pointer mx-2 bg-bgBlue w-8 h-8 rounded-full flex justify-center items-center"
            onClick={logoutUser}
          >
            <AiOutlineArrowRight className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
