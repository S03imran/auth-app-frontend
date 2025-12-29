import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

function RouteLayout() {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default RouteLayout;
