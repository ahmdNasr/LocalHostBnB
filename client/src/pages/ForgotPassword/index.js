import { Link } from "react-router-dom";
import ForogtPasswordForm from "./ForogtPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div>
      <h1>Please enter your email to receive a password reset link</h1>
      <ForogtPasswordForm />
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

export default ForgotPasswordPage;
