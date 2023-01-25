import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <h1>Create a new Account</h1>
      <RegisterForm />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
