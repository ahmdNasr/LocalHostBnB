import AddStayForm from "./AddStayForm";

const ProfilePage = ({ token }) => {
  return (
    <>
      <h1>Profile</h1>
      <AddStayForm token={token} />
    </>
  );
};

export default ProfilePage;
