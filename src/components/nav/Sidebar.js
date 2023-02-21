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
      </ul>
    </div>
  );
}

export default Sidebar;
