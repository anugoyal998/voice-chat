import React, { useState } from "react";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import { FiMail } from "react-icons/fi";
import TextInput from "../../../components/shared/TextInput";

const Email = ({onNext}) => {
  const [email, setEmail] = useState();
  return (
    <Card>
      <p className="text-lg font-medium text-textPrimary flex space-x-1 items-center justify-center mb-4">
        <FiMail /> <span>Enter your Email address</span>
      </p>
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>
      <div className="mt-[30px]">
          <Button text="Next" onClick={onNext} />
        </div>
        <p className="text-sm text-textSecondary mt-3 w-[70%] mx-auto">
          By entering your Phone Number, you're agreeing to our terms of Service
          and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Email;
