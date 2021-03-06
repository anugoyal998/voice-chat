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
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader";
import Room from "./pages/Room/Room";

const App = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const {loading} = useLoadingWithRefresh()
  if (!loading) {
    return (
      <div className="h-screen bg-bgPrimary py-4">
        <Navigation />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/authenticate"
              element={isAuth ? <Navigate to="/rooms" /> : <Authenticate />}
            />
            <Route
              path="/rooms"
              element={
                !isAuth ? (
                  <Navigate to="/" />
                ) : (
                  <Rooms />
                )
              }
            />
            <Route
              path="/room/:id"
              element={
                !isAuth ? (
                  <Navigate to="/" />
                )  : (
                  <Room />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    );
  } else return(
    <div className="h-screen bg-bgPrimary">
    <Loader message="Loading...please wait..." />
  </div>
  )
};

export default App;
