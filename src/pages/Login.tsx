import React, { useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import type LoginData from "@/models/LoginData";
import toast from "react-hot-toast";
import { loginUser } from "@/services/AuthService";
import { useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/auth/store";
import OAuth2Buttons from "@/components/OAuth2Buttons";

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const login = useAuth((state) => state.login);

  const navigate = useNavigate();
  const hanldeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(event.target);
    console.log(loginData);

    //validation
    if (loginData.email.trim() === "") {
      toast.error("Input required");
      return;
    }
    if (loginData.password.trim() === "") {
      toast.error("Input required");
      return;
    }

    //server call for login
    try {
      setLoading(true);
      const userInfo = await login(loginData);
      //const userInfo = await loginUser(loginData);
      toast.success("Login Success");
      console.log(userInfo);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr p-4">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
      >
        {error && (
          <div className="mt-6 flex-col">
            <Alert variant={"destructive"}>
              <CheckCircle2Icon />
              <AlertTitle>
                {error?.response
                  ? error?.response?.data?.message
                  : error?.message}
              </AlertTitle>
            </Alert>
          </div>
        )}
        <h2 className="mt-4 text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full bg-gray-800 text-white placeholder-gray-400"
            name="email"
            value={loginData.email}
            onChange={hanldeInputChange}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-1" htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="********"
            className="w-full bg-gray-800 text-white placeholder-gray-400"
            name="password"
            value={loginData.password}
            onChange={hanldeInputChange}
          />
        </div>

        {/* Login Button */}
        <Button className="w-full">
          {loading ? (
            <>
              <Spinner /> Please wait..
            </>
          ) : (
            "Login"
          )}
        </Button>
        <form />
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-600" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        <div>
          <OAuth2Buttons />
        </div>

        {/* Social Buttons */}

        <p className="text-gray-400 text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="#!" className="text-purple-400 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
