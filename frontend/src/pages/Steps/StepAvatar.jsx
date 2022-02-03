import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setAvatar} from '../../store/activateSlice'
import {setAuth} from '../../store/authSlice'
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import { activate } from "../../http";

const StepAvatar = () => {
  const dispatch =  useDispatch()
  const {name, avatar} = useSelector(state=> state.activate)
  const [image,setImage] = useState("https://picsum.photos/100")
  const captureImage = e=> {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      setImage(reader.result)
      dispatch(setAvatar(reader.result))
    }
  }
  const submit = async ()=> {
    try {
      if(!name || !avatar)return
      const {data} = await activate({name,avatar})
      if(data.auth){
        dispatch(setAuth(data))
      }
    } catch (error) {
      console.log(error)
      return
    }
  }
  return (
    <div className="flex justify-center items-center mt-[6rem]">
      <Card>
        <p className="text-lg font-medium text-textPrimary mb-1">
          🙉 Okay, <span className="capitalize">{name}!</span>
        </p>
        <p className="text-textSecondary text-center mb-2">How's this photo?</p>
        <div className="justify-center flex items-center overflow-hidden mb-2">
          <img src={image} alt="avatar" className="rounded-full border-4 border-bgBlue object-cover w-[100px] h-[100px]" />
        </div>
        <div className="mb-2">
          <input type="file" accept="image/*" className="hidden" id="avatarInput" onChange={captureImage} />
          <label className="text-lg text-bgBlue cursor-pointer hover:underline" htmlFor="avatarInput">Choose a different photo</label>
        </div>
        <div>
            <Button text="Next" onClick={submit} />
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
