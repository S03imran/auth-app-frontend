import React from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="flex justify-around items-center h-14 dark:bg-gray-900">
      <div>
        <span> Auth App</span>
      </div>

      <div className="flex gap-2 items-center">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/login"}>
          <Button className="cursor-pointer" variant={"outline"}>
            Login
          </Button>
        </NavLink>
        <NavLink to={"/signup"}>
          <Button className="cursor-pointer" variant={"outline"}>
            SignUp
          </Button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
