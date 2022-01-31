import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import { Title } from "../../constants/Title";
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const pushRegister = () => {
        navigate('/register')
    }
  return (
    <div className="flex justify-center mt-[4rem]">
      <Card>
        <p className="text-lg font-medium text-textPrimary">
          👋🏼 Welcome to {Title}
        </p>
        <p className="text-sm mt-4 text-textSecondary mb-5 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          consectetur magnam incidunt eos enim adipisci cupiditate maiores
          quaerat nam porro.
        </p>
        <Button onClick={pushRegister} />
        <div className="flex justify-center space-x-1 mt-4 text-sm">
          <span className="text-bgBlue">Have an invite text?</span>
          <Link to="/login">
            <span className="font-medium text-bgBlue">Sign in</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
