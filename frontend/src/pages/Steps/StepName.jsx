import React, { useState } from "react";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import TextInput from "../../components/shared/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../store/activateSlice";
import { ToastConfig } from "../../toast/toast-config";
import toast, { Toaster } from "react-hot-toast";

const StepName = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.activate);
  const [fullName, setFullName] = useState(name);
  const nextStep = () => {
    if (!fullName) {
      toast("Invalid name", ToastConfig.errorDarkMode);
      return;
    }
    dispatch(setName(fullName));
    onNext();
  };
  return (
    <div className="flex justify-center items-center mt-[6rem]">
      <Toaster />
      <Card>
        <p className="text-lg font-medium text-textPrimary mb-4">
          😎 What's your name?
        </p>
        <TextInput
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div>
          <p className="text-sm text-textSecondary mt-3 w-[70%] mx-auto">
            People use real names at voice chat :)
          </p>
          <div className="mt-[30px]">
            <Button text="Next" onClick={nextStep} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StepName;
