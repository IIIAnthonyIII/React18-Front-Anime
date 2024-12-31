import React from "react";
import Error from "../views/error/Error";
import { Route, Routes } from "react-router-dom";
import AnimeAd from "../views/anime/admin/AnimeAd";
import Dashboard from "../views/dashboard/Dashboard";
import Type from "../views/type/Type";
import Navigation from "../components/navigation/Navigation";
import "./router.css";

const RouterApp = () => {
  return (
    <div className="dashboard">
      {/* <div > */}
        <Navigation />
      {/* </div> */}
      {/* <div className="routes"> */}
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<AnimeAd />} />
          <Route path="/animead" element={<AnimeAd />} />
          <Route path="/type" element={<Type />} />
          <Route path="*" element={<Error />} />
        </Routes>
      {/* // </div> */}
    </div>
  );
};

export default RouterApp;
