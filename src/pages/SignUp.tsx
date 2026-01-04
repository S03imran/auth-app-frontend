import React, { useState, type FormEvent } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData";
import { registerUser } from "@/services/AuthService";
import { useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import OAuth2Buttons from "@/components/OAuth2Buttons";

export default function Signup() {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const hanldeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(data);

    //validation
    if (data.name.trim() === "") {
      toast.error("Name is required");
      return;
    }

    if (data.email.trim() === "") {
      toast.error("Email is required");
      return;
    }

    if (data.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    //submit form for registration
    try {
      const result = await registerUser(data);
      console.log(result);
      toast.success("User registered successfully");
      setData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred during registration");
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
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
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="name">
            Name
          </label>
          <Input
            type="text"
            id="name"
            placeholder="Your full name"
            className="w-full bg-gray-800 text-white placeholder-gray-400"
            name="name"
            value={data.name}
            onChange={hanldeInputChange}
          />
        </div>

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
            value={data.email}
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
            value={data.password}
            onChange={hanldeInputChange}
          />
        </div>

        {/* Signup Button */}
        <Button className="w-full">Sign Up</Button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-600" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Social Signup Buttons */}
        <div className="flex flex-col gap-3">
          <OAuth2Buttons />
        </div>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
