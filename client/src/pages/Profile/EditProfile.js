import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";
import { makeFormData } from "../../utils/formData";

const EditProfile = ({ token, profileInfo, onDone, onCancel }) => {
  const [firstName, setFirstName] = useState(profileInfo.firstName);
  const [lastName, setLastName] = useState(profileInfo.lastName);
  const [email, setEmail] = useState(profileInfo.email);
  const [bio, setBio] = useState(profileInfo.bio);
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    `${apiBaseUrl}/img/${profileInfo.profilePicture}`
  );
  const [profilePicture, setProfilePicture] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!profilePicture) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(profilePicture);
    reader.onloadend = function () {
      const base64data = reader.result;
      setProfilePicturePreview(base64data);
    };
  }, [profilePicture]);

  const editProfile = (event) => {
    event.preventDefault();

    const formData = makeFormData({
      firstName,
      lastName,
      email,
      bio,
      profilePicture,
    });

    fetch(`${apiBaseUrl}/users/profile`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "ok") {
          console.log(result);
          onDone({ ...profileInfo, ...result });
        } else {
          console.log(error);
          setErrorMessage("Error editing profile, try again later");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error editing profile, try again later");
      });
  };

  const cancelEdit = (event) => {
    event.preventDefault();
    return onCancel();
  };

  return (
    <form>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />

      <img
        className="user-profile-avatar"
        src={profilePicturePreview}
        alt={`${profileInfo.firstName} avatar preview`}
      />
      <input
        type="file"
        onChange={(e) => setProfilePicture(e.target.files[0])}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={editProfile}>Save</button>
      <button onClick={cancelEdit}>Cancel</button>

      <p className="error-message">{errorMessage}</p>
    </form>
  );
};

export default EditProfile;
