import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../pages";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../pages/api/axios";
import Swal from "sweetalert2";

function Header({ simple, hideAuth }) {
  const { isAuthenticated } = useContext(AuthContext);

  async function logoutHandler() {
    try {
      const result = await logout();
      const data = result?.data;
      const bool = result?.status === 200;

      Swal.fire({
        title: data?.message || "Se produjo un error al obtener una respuesta",
        text: bool
          ? "Gracias por visitarnos"
          : "Si el error persiste comunicate con soporte.",
        icon: bool ? "success" : "error",
      }).then((result) => {
        if (result.isConfirmed && bool) {
          window.location.reload();
        }
      });
    } catch (error) {
      alert("Se produjo un error");
    }
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              {/* <FontAwesomeIcon
                icon={["fas", "shopping-basket"]}
                className="d-inline-block"
              /> */}
              <span className="ms-2 mb-0 h4 text-primary fw-bold">
                BasilOrien Mart
              </span>
            </a>
          </Link>
          <div className="collapse navbar-collapse">
            <form className="d-flex">
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  size="32"
                />
                <button type="button" className="btn btn-primary">
                  <FontAwesomeIcon icon={["fas", "search"]} />
                </button>
              </div>
            </form>
          </div>
          <div className="d-flex">
            {hideAuth ? null : isAuthenticated ? (
              <button
                onClick={(e) => {
                  logoutHandler(e);
                }}
                className="btn btn-outline-primary d-none d-md-block"
              >
                Cerrar sesion
              </button>
            ) : (
              <>
                <Link href="/auth/login">
                  <a className="btn btn-outline-primary d-none d-md-block">
                    Login
                  </a>
                </Link>
                <Link href="/auth/sign-up">
                  <a className="btn btn-primary d-none d-md-block ms-2">
                    Sign up
                  </a>
                </Link>
              </>
            )}
            <Link href="/shopping-cart">
              <a className="btn btn-light border position-relative ms-2 fw-normal">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                &nbsp;Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger my-auto">
                  3
                </span>
              </a>
            </Link>
          </div>
        </div>
      </nav>
      {!simple && (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container">
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/explore">
                    <a className="nav-link">All Categories</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/explore">
                    <a className="nav-link">Electronics</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/explore">
                    <a className="nav-link">Clothing</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/explore">
                    <a className="nav-link">Furnitures</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/explore">
                    <a className="nav-link">Medicines</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/explore">
                    <a className="nav-link">Cosmetics</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
