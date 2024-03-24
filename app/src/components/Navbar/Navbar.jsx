import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "isActive nav__item" : "nav__item"
        }
      >
        A
      </NavLink>
      <NavLink
        to="/opl"
        className={({ isActive }) =>
          isActive ? "isActive nav__item" : "nav__item"
        }
      >
        O
      </NavLink>
      <NavLink
        to="/report"
        className={({ isActive }) =>
          isActive ? "isActive nav__item" : "nav__item"
        }
      >
        R
      </NavLink>
      <NavLink
        to="/finding"
        className={({ isActive }) =>
          isActive ? "isActive nav__item" : "nav__item"
        }
      >
        F
      </NavLink>
    </nav>
  );
}
