import useAuth from "@/auth/store";
import { refreshToken } from "@/services/AuthService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function OAuth2Success() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const changeLocalLoginData = useAuth((state) => state.changeLocalLoginData);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAccessToken() {
      if (!isRefreshing) {
        setIsRefreshing(true);
        try {
          const loginResponseData = await refreshToken();
          changeLocalLoginData(
            loginResponseData.accessToken,
            loginResponseData.user,
            true
          );
          navigate("/dashboard");
        } catch (error) {
        } finally {
          setIsRefreshing(false);
        }
      }
    }

    getAccessToken();
  }, []);

  return <div>OAuth2Success</div>;
}

export default OAuth2Success;
