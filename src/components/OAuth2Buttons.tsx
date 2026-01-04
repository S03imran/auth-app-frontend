import React from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";

function OAuth2Buttons() {
  return (
    <div className="space-y-3">
      <NavLink
        to={`${
          import.meta.env.VITE_BASE_URL || "http://localhost:8080"
        }/oauth2/authorization/google`}
        className={"block"}
      >
        <Button
          type="button"
          variant="outline"
          className=" w-full flex items-center justify-center gap-2 border-gray-600 text-white hover:bg-gray-700"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </Button>
      </NavLink>

      <NavLink
        to={`${
          import.meta.env.VITE_BASE_URL || "http://localhost:8080"
        }/oauth2/authorization/github`}
        className={"block"}
      >
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-600 text-white hover:bg-gray-700"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="w-5 h-5"
          />
          Continue with GitHub
        </Button>
      </NavLink>
    </div>
  );
}

export default OAuth2Buttons;
