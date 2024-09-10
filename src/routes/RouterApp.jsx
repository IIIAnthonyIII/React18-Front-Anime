import React from "react";
import Error from "../views/error/Error";
import { Route, Routes } from "react-router-dom";
import AnimeAd from "../views/anime/admin/AnimeAd";
import Dashboard from "../views/dashboard/Dashboard";

const RouterApp = () => {
  return (
    <div>
      {/* <Navigation /> */}
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<AnimeAd />} />
        <Route path="/animead" element={<AnimeAd />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default RouterApp;