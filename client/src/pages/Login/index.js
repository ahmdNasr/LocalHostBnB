import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = ({ setToken }) => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm setToken={setToken} />
      <p>
        Dont't have an account? <Link to="/register">Account ++</Link>
      </p>
      <p>
        Forgot Password?{" "}
        <Link to="/forgot-password">Email me a reset link</Link>
      </p>
    </div>
  );
};

export default LoginPage;
