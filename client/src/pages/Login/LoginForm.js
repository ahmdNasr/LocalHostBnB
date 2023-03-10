import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState("nils@supercode.de");
  const [password, setPassword] = useState("hallo123");
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
      credentials: "include", // muss sein für refresh token! -- "save httpOnly cookie session"
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "error") {
          // error handling...
          setErrorMessage(error.message);
          return;
        }
        // result: { acccessToken, refreshToken }
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
