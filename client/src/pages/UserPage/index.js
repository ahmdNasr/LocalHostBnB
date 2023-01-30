import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import DefaultPage from "../../components/DefaultPage";
import StaysGrid from "../../components/StaysGrid";

const UserPage = ({ token }) => {
  const [stays, setStays] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  const { userId } = useParams();
  useEffect(() => {
    fetch(`${apiBaseUrl}/stays/?hostId=${userId}`, {
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
  }, [token, userId]);

  return (
    <DefaultPage>
      <StaysGrid stays={stays} />
    </DefaultPage>
  );
};

export default UserPage;
