import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";

function Main() {
  const [auth, setAuth] = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // auth as a whole is like an object that is why we do the JSON parse or stringify on it. so auth.user gives us the user
  const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
      toast.error("Please Log in to create an Ad");
    }
  };

  return (
    <nav className="nav d-flex justify-content-between p-2 lead">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <a className="nav-link pointer" onClick={handlePostAdClick}>
        Post Ad
      </a>
      {!loggedIn ? (
        <>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </>
      ) : (
        ""
      )}
      {loggedIn ? (
        <div className="dropdown">
          <li onClick={() => setDropdown(!dropdown)}>
            <a className="nav-link dropdown-toggle pointer" data-bs-toggle="dropdown">
              {auth?.user?.name ? auth.user.name : auth.user.username}
            </a>

            <ul className={`dropdown-menu ${dropdown && "show"}`}>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <a onClick={logout} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Main;
