import DefaultPage from "../../components/DefaultPage";
import AddStayForm from "./AddStayForm";

const ProfilePage = ({ token }) => {
  return (
    <DefaultPage>
      <h1>Profile</h1>
      <AddStayForm token={token} />
    </DefaultPage>
  );
};

export default ProfilePage;
