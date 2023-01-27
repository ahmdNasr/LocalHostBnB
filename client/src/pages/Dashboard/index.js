import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import Stay from "../../components/Stay";

const DashboardPage = ({ token }) => {
  const [stays, setStays] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`${apiBaseUrl}/stays/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ status, result: staysResult, error }) => {
        if (status === "ok") {
          setStays(staysResult);
        } else {
          setErrorMessage(error.message);
        }
      });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/profile">Profile</Link>
      <main className="stays-container">
        {stays.map((stay) => (
          <Stay key={stay._id} stay={stay} />
        ))}
      </main>
      <p>{errorMessage}</p>
    </>
  );
};

export default DashboardPage;
