import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import DefaultPage from "../../components/DefaultPage";
import StaysGrid from "../../components/StaysGrid";
import StayFilters from "./StayFilters";

const DashboardPage = ({ token }) => {
  const [stays, setStays] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [filterQueryString, setFilterQueryString] = useState("");

  useEffect(() => {
    fetch(`${apiBaseUrl}/stays?${filterQueryString}`, {
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
  }, [filterQueryString, token]);

  return (
    <DefaultPage>
      <h1>Dashboard</h1>
      <StayFilters
        onFilter={(newFilterString) => setFilterQueryString(newFilterString)}
      />
      <StaysGrid stays={stays} />
      <p>{errorMessage}</p>
    </DefaultPage>
  );
};

export default DashboardPage;
