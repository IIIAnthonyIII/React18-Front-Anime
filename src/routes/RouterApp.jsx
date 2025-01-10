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
    setWidth((option === true) ? 1270 : 1450);
  };
  return (
    <div className="dashboard">
      <Navigation onOptionSelect={handleOptionSelect}/>
      <Routes>
        <Route path="/" element={<Dashboard navigHandled={width}/>} />
        <Route path="/animead" element={<AnimeAd navigHandled={width}/>} />
        <Route path="/type" element={<Type navigHandled={width}/>} />
        <Route path="*" element={<Error navigHandled={width}/>} />
      </Routes>
    </div>
  );
};

export default RouterApp;
