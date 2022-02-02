import React, { useState } from 'react';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import TextInput from '../../components/shared/TextInput';
import { verifyOtp } from '../../http';
import { useSelector } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const StepOtp = () => {
  const dispatch =  useDispatch()
  const [otp,setOtp] = useState()
  const {phone,hash} = useSelector(state=> state.auth.otp)
  const submit = async ()=> {
    try {
      const {data} = await verifyOtp({otp,phone,hash})
      console.log(data)
      dispatch(setAuth(data))
    } catch (error) {
      console.log(error)
      return
    }
  }
  return <div className="flex justify-center items-center mt-[6rem]">
    <Card>
      <p className="text-lg font-medium text-textPrimary mb-4">
        🔒 Enter the code we texted you
      </p>
      <TextInput
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
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
  </div>;
};

export default StepOtp;
