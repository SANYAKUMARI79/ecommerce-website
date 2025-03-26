import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/men" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Men
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/women" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Women
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/account/order" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
