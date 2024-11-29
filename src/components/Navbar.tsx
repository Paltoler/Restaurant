import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CartOffCanvas } from "./CartOffCanvas";

export const Navbar = () => {
  return (
    <nav className="navbar bg-dark fixed-top py-0">
      <div className="container-fluid d-flex justify-content-around py-0">
        <Link className="nav-link fs-4" to="/store">
          Mat
        </Link>
        <Link className="nav-link fs-4" to="/drinkmenu">
          Dryck
        </Link>
        <button
          className="nav-link fs-4"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation">
          {" "}
          Varukorg
        </button>
        <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <button type="button" className="btn btn-dark rounded-0 fw-bold text-uppercase" data-bs-dismiss="offcanvas" aria-label="Close">
            Stäng
          </button>
          <div className="offcanvas-body bg-secondary-subtle p-0">
            <CartOffCanvas />
          </div>
        </div>
      </div>
    </nav>
  );
};
