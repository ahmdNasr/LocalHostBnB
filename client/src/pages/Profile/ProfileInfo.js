import { useState, useEffect } from "react";
import { apiBaseUrl } from "../../api";

const ProfileInfo = ({ token }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);
  console.log(profileInfo);
  useEffect(() => {
    fetch(`${apiBaseUrl}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "ok") {
          setProfileInfo(result);
        } else {
          setErrorMessage(error.message);
        }
      });
  }, []);
  return (
    <div>
      <h2>
        {profileInfo.firstName} {profileInfo.lastName}
      </h2>
      <p> {profileInfo.bio}</p>
      <img
        className="stay-host-avatar"
        src={profileInfo.profilePicture}
        alt={`${profileInfo.firstName} bild`}
      />
      <p> {profileInfo.email}</p>
    </div>
  );
};

export default ProfileInfo;
