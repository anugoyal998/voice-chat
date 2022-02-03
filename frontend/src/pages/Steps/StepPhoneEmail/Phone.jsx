import React, { useState } from "react";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import TextInput from "../../../components/shared/TextInput";
import { sendOtp } from "../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../store/authSlice";
import toast, {Toaster} from 'react-hot-toast'
import {ToastConfig} from '../../../toast/toast-config'

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const dispatch = useDispatch();
  const submit = async () => {
    if (!phoneNumber) {
      toast("Invalid phone number", ToastConfig.errorDarkMode);
      return
    }
    try {
      const { data } = await sendOtp({ phone: phoneNumber });
      console.log(data);
      dispatch(setOtp({ phone: data.phone, hash: data.hash }));
      onNext();
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <Card>
      <Toaster/>
      <p className="text-lg font-medium text-textPrimary mb-4">
        ☎ Enter your Phone Number
      </p>
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className="mt-[30px]">
          <Button text="Next" onClick={submit} />
        </div>
        <p className="text-sm text-textSecondary mt-3 w-[70%] mx-auto">
          By entering your Phone Number, you're agreeing to our terms of Service
          and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
