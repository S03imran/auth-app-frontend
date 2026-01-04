import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login.tsx";
import RouteLayout from "./pages/RouteLayout.tsx";
import SignUp from "./pages/SignUp.tsx";
import Services from "./pages/Services.tsx";
import About from "./pages/About.tsx";
import UserLayout from "./pages/users/UserLayout.tsx";
import UserHome from "./pages/users/UserHome.tsx";
import UserProfile from "./pages/users/UserProfile.tsx";
import OAuth2Success from "./pages/users/OAuth2Success.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RouteLayout />}>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Route>
      <Route path="auth/success" element={<OAuth2Success />} />
      <Route path="auth/failure" element={<OAuth2Success />} />
    </Routes>
  </BrowserRouter>
);
