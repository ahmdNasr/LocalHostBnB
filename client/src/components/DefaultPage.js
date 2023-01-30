import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../api";
import { ReactComponent as Logo } from "../logo.svg";

const LogoutButton = () => {
  const navigate = useNavigate();

  function logout(event) {
    event.preventDefault();

    fetch(`${apiBaseUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/logout");
      });
  }
  return <button className="logout-button underlineHover" onClick={logout}>Logout</button>;
};

const DefaultPage = ({ children }) => {
  return (
    <div>
      <nav className="top-bar ">
        <Link to="/">
          <Logo className="logo" />
        </Link>
        <ul>
          <li className="underlineHover">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="underlineHover">
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <LogoutButton />
      </nav>
      <div className="page-container">{children}</div>
    </div>
  );
};

export default DefaultPage;
