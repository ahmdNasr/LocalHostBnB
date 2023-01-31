import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import DefaultPage from "../../components/DefaultPage";
import StaysGrid from "../../components/StaysGrid";
import AddStayForm from "./AddStayForm";
import ProfileInfo from "./ProfileInfo";

const ProfilePage = ({ token }) => {
  const [stays, setStays] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/stays/?onlyMyStays=yes`, {
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
      <h1>Profile</h1>
      <ProfileInfo token={token} />
      <StaysGrid stays={stays} />
      <AddStayForm token={token} />
    </DefaultPage>
  );
};

export default ProfilePage;
