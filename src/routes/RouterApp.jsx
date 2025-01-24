import Navigation from "../components/navigation/Navigation";
import Dashboard from "../views/dashboard/Dashboard";
import AnimeAd from "../views/anime/admin/AnimeAd";
import { Route, Routes } from "react-router-dom";
import Error from "../views/error/Error";
import React, { useState } from "react";
import Type from "../views/type/Type";
import "./router.css";

const RouterApp = () => {
  const [width, setWidth] = useState(93);
  const handleOptionSelect = (option) => {
    setWidth((option === true) ? 81 : 93);
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
