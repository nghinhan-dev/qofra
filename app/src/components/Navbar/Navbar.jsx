import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "isActive nav__item d__flex" : "nav__item d__flex"
        }
      >
        A
      </NavLink>
      <NavLink
        to="/opl"
        className={({ isActive }) =>
          isActive ? "isActive nav__item d__flex" : "nav__item d__flex"
        }
      >
        O
      </NavLink>
      <NavLink
        to="/report"
        className={({ isActive }) =>
          isActive ? "isActive nav__item d__flex" : "nav__item d__flex"
        }
      >
        R
      </NavLink>
      <NavLink
        to="/finding"
        className={({ isActive }) =>
          isActive ? "isActive nav__item d__flex" : "nav__item d__flex"
        }
      >
        F
      </NavLink>
    </nav>
  );
}
