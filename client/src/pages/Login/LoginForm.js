import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();

    fetch(`${apiBaseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "error") {
          // error handling...
          setErrorMessage(error.message);
          return;
        }
        setToken(result.accessToken);
        return navigate("/dashboard");
      });
  }
  return (
    <form>
      <input
        type="email"
        placeholder="tom.nasr@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="hallo123"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
