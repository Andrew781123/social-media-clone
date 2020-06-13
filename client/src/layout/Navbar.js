import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/auth/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
