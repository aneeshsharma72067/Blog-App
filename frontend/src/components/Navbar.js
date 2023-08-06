import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Logo from "../img/HYPEPOST.png";
import CustomLink from "./CustomLink";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const router = useLocation();
  const handleClick = () => {
    logout();
    window.location.reload();
    return <Navigate to={router.pathname} />;
  };
  return (
    <div className="navbar">
      <div id="logo">
        <Link to={"/"}>
          <img src={Logo} alt="logo.png" />
        </Link>
      </div>
      <div className="navlist">
        <nav>
          <ul>
            <li className="nav-item">
              <CustomLink title={"Home"} href={"/"} />
            </li>
            <li className="nav-item">
              <CustomLink title={"My Blogs"} href={"/my-blogs"} />
            </li>
            <li className="nav-item">
              <CustomLink title={"Create"} href={"/create"} />
            </li>
            <li className="nav-item">
              <CustomLink title={"About Us"} href={"/about"} />
            </li>
            <li className="nav-item">
              <CustomLink title={"Contact"} href={"/contact"} />
            </li>
          </ul>
        </nav>
      </div>
      {!user && (
        <div className="auth__links">
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </div>
      )}
      {user && (
        <div className="user_logged_in">
          {user.username && <div>@{user.username}</div>}
          <div className="auth__links" onClick={handleClick}>
            <button>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
