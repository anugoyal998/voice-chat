import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../store/activateSlice";
import { setAuth } from "../../store/authSlice";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import { activate } from "../../http";
import Loader from "../../components/shared/Loader";
import { ToastConfig } from "../../toast/toast-config";
import toast, { Toaster } from "react-hot-toast";

const StepAvatar = () => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("https://picsum.photos/100");
  const [loading, setLoading] = useState(false);
  const [unMounted,setUnMounted] = useState(false);
  const captureImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };
  const submit = async () => {
    if (!name || !avatar) {
      toast("Please upload profile pic!", ToastConfig.errorDarkMode);
      return;
    }
    setLoading(true);
    try {
      if (!name || !avatar) return;
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        if(!unMounted){
          dispatch(setAuth(data));
        }
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=> {
    return ()=> {
      setUnMounted(true)
    }
  },[])
  if (!loading) {
    return (
      <div className="flex justify-center items-center mt-[6rem]">
        <Toaster />
        <Card>
          <p className="text-lg font-medium text-textPrimary mb-1">
            🙉 Okay, <span className="capitalize">{name}!</span>
          </p>
          <p className="text-textSecondary text-center mb-2">
            How's this photo?
          </p>
          <div className="justify-center flex items-center overflow-hidden mb-2">
            <img
              src={image}
              alt="avatar"
              className="rounded-full border-4 border-bgBlue object-cover w-[100px] h-[100px]"
            />
          </div>
          <div className="mb-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatarInput"
              onChange={captureImage}
            />
            <label
              className="text-lg text-bgBlue cursor-pointer hover:underline"
              htmlFor="avatarInput"
            >
              Choose a different photo
            </label>
          </div>
          <div>
            <Button text="Next" onClick={submit} />
          </div>
        </Card>
      </div>
    );
  } else
    return (
      <div className="h-screen bg-bgPrimary">
        <Loader message="Activation in progress...." />
      </div>
    );
};

export default StepAvatar;
