import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import logo from "./logo.svg";
import { ReactComponent as Logo } from "./logo.svg";

import "./App.css";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Protected from "./components/Protected";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <Logo />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
