import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Images/png/Snowbizz.png";
import { useAuth } from "../../context/auth";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <img src={logo} className="logo" alt="" />

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!auth.user ? (
                <>
                  {" "}
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa-solid fa-user"></i>
                    </a>
                    <ul class="dropdown-menu">
                      <li className="nav-item">
                        <NavLink className="nav-link mx-2" to="/signup">
                          <i class="fa-solid fa-user-pen fa-bounce"></i>{" "}
                          &nbsp;Register
                        </NavLink>
                      </li>

                      <li>
                        <NavLink className="nav-link mx-2" to="/login">
                          <i class="fa-solid fa-user-check fa-bounce text-success"></i>{" "}
                          &nbsp; Login
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa-solid fa-user"></i>
                      &nbsp;
                      {auth?.user?.name}
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="nav-link mx-2"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link mx-2"
                          onClick={handleLogout}
                          to="/login"
                        >
                          <i class="fa-solid fa-user-xmark text-danger fa-fade"></i>{" "}
                          &nbsp; LogOut{" "}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link mx-2" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/category">
                  Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/cart">
                  <i class="fa-solid fa-cart-shopping"></i> (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
