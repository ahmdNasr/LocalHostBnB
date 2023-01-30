import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import DefaultPage from "../../components/DefaultPage";
import StaysGrid from "../../components/StaysGrid";

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
    <DefaultPage>
      <h1>Dashboard</h1>
      <StaysGrid stays={stays} />
      <p>{errorMessage}</p>
    </DefaultPage>
  );
};

export default DashboardPage;
