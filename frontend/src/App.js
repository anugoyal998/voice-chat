import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/shared/Navigation";
import Authenticate from "./pages/authenticate/Authenticate";
import Home from "./pages/Home/Home";
import Activate from "./pages/activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import {useSelector} from 'react-redux'

const App = () => {
  const {user,isAuth} = useSelector(state=> state.auth)
  return (
    <div className="h-screen bg-bgPrimary">
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/authenticate"
            element={isAuth ? <Navigate to="/rooms" /> : <Authenticate />}
          />
          <Route
            path="/activate"
            element={
              !isAuth ? (
                <Navigate to="/" />
              ) : isAuth && !user?.activated ? (
                <Activate />
              ) : (
                <Navigate to="/rooms" />
              )
            }
            // element={<Activate/>}
          />
          <Route
            path="/rooms"
            element={
              !isAuth ? (
                <Navigate to="/" />
              ) : isAuth && !user?.activated ? (
                <Navigate to="/activate" />
              ) : (
                <Rooms />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
