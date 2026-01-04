import React from "react";
import { Button } from "./ui/button";
import { NavLink, useNavigate } from "react-router";
import useAuth from "@/auth/store";

function Navbar() {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
  return (
    <nav className="flex justify-around items-center h-14 dark:bg-gray-900">
      <div>
        <span> Auth App</span>
      </div>

      <div className="flex gap-2 items-center">
        {checkLogin() ? (
          <>
            <NavLink to={"/dashboard/profile"}>{user?.name}</NavLink>
            <Button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="cursor-pointer"
              variant={"outline"}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
