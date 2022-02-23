import React, { useState } from "react";
import Card from "../../components/shared/Card";
import { saveUser, sendOtp } from "../../http";
import { useDispatch } from "react-redux";
import { setAuth, setOtp } from "../../store/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { ToastConfig } from "../../toast/toast-config";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import errorHandler from "../../utils/errorHandler"

const Phone = () => {
  const dispatch = useDispatch();
  const loginFailure = (res) => {
    console.log(res);
  };
  const loginSuccess = async (res) => {
    await errorHandler(async () => {
      const { data } = await saveUser({
        name: res?.profileObj?.name,
        email: res?.profileObj?.email,
        avatar: res?.profileObj?.imageUrl,
      });
      console.log(data)
      dispatch(setAuth(data))
      localStorage.setItem('at',data?.tokens?.accessToken)
      localStorage.setItem('rt',data?.tokens?.refreshToken)
      toast('Signin Success',ToastConfig.successDarkMode)
    },`frontend\src\pages\Steps\StepPhoneEmail\Login.jsx`);
  };
  return (
    <Card classes="flex justify-center items-center flex-col">
      <Toaster />
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GCID}`}
        render={(renderProps) => (
          <div className="flex justify-center">
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="shadow-xl flex justify-between items-center py-3 px-5 space-x-6 bg-bgPrimary rounded-3xl"
            >
              <div>
                <FcGoogle />
              </div>
              <span>Login with Google</span>
            </button>
          </div>
        )}
        buttonText="Login"
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        cookiePolicy={"single_host_origin"}
      />
      <div>
        <p className="text-sm text-textSecondary mt-3 w-[70%] mx-auto">
          By Signing in, you're agreeing to our terms of Service and Privacy
          Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
