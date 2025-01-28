import Navigation from "../components/navigation/Navigation";
// import Dashboard from "../views/dashboard/Dashboard";
// import AnimeAd from "../views/anime/admin/AnimeAd";
import { Route, Routes } from "react-router-dom";
// import Error from "../views/error/Error";
import React, { useState, Suspense, lazy } from "react";
// import Type from "../views/type/Type";
import "./router.css";

// Usa React.lazy para cargar los componentes de forma diferida
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const AnimeAd = lazy(() => import("../views/anime/admin/AnimeAd"));
const Type = lazy(() => import("../views/type/Type"));
const Error = lazy(() => import("../views/error/Error"));


const RouterApp = () => {
  const [width, setWidth] = useState(93);
  const handleOptionSelect = (option) => {
    setWidth((option === true) ? 81 : 93);
  };
  return (
    <div className="dashboard">
      <Navigation onOptionSelect={handleOptionSelect}/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard navigHandled={width}/>} />
          <Route path="/animead" element={<AnimeAd navigHandled={width}/>} />
          <Route path="/type" element={<Type navigHandled={width}/>} />
          <Route path="*" element={<Error navigHandled={width}/>} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default RouterApp;
