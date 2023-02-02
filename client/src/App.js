import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import logo from "./logo.svg";

import "./App.css";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Protected from "./components/Protected";
import { apiBaseUrl } from "./api";
import LogoutPage from "./pages/Logout";
import UserPage from "./pages/UserPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";

function App() {
  const [token, setToken] = useState(null);
  console.log(Date.now(), token);
  useEffect(() => {
    if (!token) {
      return;
    }
    // refresh token before it expires
    const tokenPayloadBase64Str = token.split(".")[1];
    const tokenPayloadJsonStr = atob(tokenPayloadBase64Str);
    const tokenPayload = JSON.parse(tokenPayloadJsonStr);
    const exp = tokenPayload.exp;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    const tenSecondsBefore = 10;
    const triggerSilentTokenRefreshInSeconds =
      exp - nowInSeconds - tenSecondsBefore;

    console.log({ triggerSilentTokenRefreshInSeconds });
    const refreshTokenTimeoutID = setTimeout(() => {
      console.log("about to do silet refresh");

      fetch(`${apiBaseUrl}/users/refresh-token`, {
        method: "POST",
        credentials: "include", // here: take refresh token from httpOnly secure cookie and send it
      })
        .then((res) => res.json())
        .then(({ result }) => {
          setToken(result?.accessToken);
        });
    }, triggerSilentTokenRefreshInSeconds * 1000);

    return () => clearTimeout(refreshTokenTimeoutID);
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/logout" element={<LogoutPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:resetPwdToken"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/dashboard"
            element={
              <Protected token={token} setToken={setToken}>
                <DashboardPage token={token} />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected token={token} setToken={setToken}>
                <ProfilePage token={token} />
              </Protected>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <Protected token={token} setToken={setToken}>
                <UserPage token={token} />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
