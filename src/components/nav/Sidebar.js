import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ad/create" className="nav-link">
            Create Ad
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user/profile" className="nav-link">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user/settings" className="nav-link">
            Settings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user/wishlist" className="nav-link">
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user/enqiries" className="nav-link">
            Enquired Properties
            {/* you can even have a way of know whether they were replied or not */}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
