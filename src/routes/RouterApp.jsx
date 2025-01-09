import React, { useState } from "react";
import Error from "../views/error/Error";
import { Route, Routes } from "react-router-dom";
import AnimeAd from "../views/anime/admin/AnimeAd";
import Dashboard from "../views/dashboard/Dashboard";
import Type from "../views/type/Type";
import Navigation from "../components/navigation/Navigation";
import "./router.css";

const RouterApp = () => {
  const [width, setWidth] = useState(1450);
  const handleOptionSelect = (option) => {
    setWidth((option === true) ? 1230 : 1450);
  };
  return (
    <div className="dashboard">
      <Navigation onOptionSelect={handleOptionSelect}/>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<AnimeAd navigHandled={width}/>} />
        <Route path="/animead" element={<AnimeAd />} />
        <Route path="/type" element={<Type />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default RouterApp;
