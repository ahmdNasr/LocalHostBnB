import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = ({ setToken }) => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm setToken={setToken} />
      <p>
        Dont't have an account? <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
