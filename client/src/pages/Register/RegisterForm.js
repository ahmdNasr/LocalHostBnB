import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiBaseUrl } from "../../api";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [profilePicture, setProfilePicture] = useState(null);
  // const [bio, setBio] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function register(event) {
    event.preventDefault(); // page reload verhindern!

    fetch(`${apiBaseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        // FIXME: use multipart/form-data and upload the file as blob!!!
        // profilePicture,
        // bio,
      }),
    })
      .then((res) => res.json())
      .then(({ status, error }) => {
        if (status === "error") {
          // error handling...
          setErrorMessage(error.message);
          return;
        }

        return navigate("/dashboard");
      });
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Tom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nasr"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <button onClick={register}>Create Account</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default RegisterForm;
