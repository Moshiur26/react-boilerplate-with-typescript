import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="mb-8 ml-8">
      <ul className="flex gap-x-8">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
