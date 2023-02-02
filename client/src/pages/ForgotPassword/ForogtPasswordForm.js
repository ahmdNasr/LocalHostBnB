import { useState } from "react";
import { apiBaseUrl } from "../../api";

const ForogtPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function forgotPassword(event) {
    event.preventDefault();

    fetch(`${apiBaseUrl}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then(({ status, error }) => {
        if (status === "error") {
          // error handling...
          setErrorMessage(error.message);
          return;
        }

        setSuccessMessage("Success! Please check your inbox...");
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

      <button onClick={forgotPassword}>Send Me Email</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default ForogtPasswordForm;
