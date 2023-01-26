import { Link } from "react-router-dom";

const DashboardPage = ({ token }) => {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/profile">Profile</Link>
    </>
  );
};

export default DashboardPage;
