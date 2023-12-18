import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Footer() {
  const { isChecked } = useContext(AuthContext);

  return (
    <div className="vstack mt-auto">
      <footer className="py-4 bg-primary">
        <div className="container py-3">
          <div className="row g-3">
            <div className="col-md-6 col-lg-4 d-none d-md-block">
              <h5 className="text-light">Contactanos</h5>
              <div className="vstack gap-1">
                <p className="mb-2 text-light text-opacity-75 small">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer in feugiat lorem.
                </p>
                <small className="d-flex text-light text-opacity-75 gap-2">
                  <FontAwesomeIcon
                    icon={["fas", "map-marker"]}
                    className="mt-1"
                  />
                  <div>Acá va la direccion del local (si aplica)</div>
                </small>
                <small className="d-flex text-light text-opacity-75 gap-2">
                  <FontAwesomeIcon
                    icon={["fas", "envelope"]}
                    className="mt-1"
                  />
                  <div>Acá va el email</div>
                </small>
                <small className="d-flex text-light text-opacity-75 gap-2">
                  <FontAwesomeIcon icon={["fas", "phone"]} className="mt-1" />
                  <div>(+95) 9 12345678</div>
                </small>
              </div>
            </div>
            <div className="col-md-6 col-lg-2 d-none d-md-block">
              <h5 className="text-light">Información</h5>
              <div className="vstack small gap-2">
                <a href="#" className="footer-link">
                  Sobre nosotros
                </a>
                <a href="#" className="footer-link">
                  Encontrá una sucursal
                </a>
                <a href="#" className="footer-link">
                  Terminos y condiciones
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-2 d-none d-md-block">
              <h5 className="text-light">Cuenta</h5>
              <div className="vstack small gap-2">
                <Link href="/auth/login">
                  <a className="footer-link">Iniciar sesión</a>
                </Link>
                <Link href="/auth/sign-up">
                  <a className="footer-link">Registro</a>
                </Link>
                <Link href="/account/profile">
                  <a className="footer-link">Perfil</a>
                </Link>
                <Link href="/account/current-orders">
                  <a className="footer-link">Mis pedidos</a>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <h5 className="text-light text-center text-md-start">Noticias</h5>
              <div className="text-light text-opacity-75 mb-3 small text-center text-md-start">
                Suscribite para recibir noticias y eventos.
              </div>
              <form className="hstack gap-2 justify-content-center justify-content-md-start mb-3">
                <div>
                  <input
                    type="email"
                    className="form-control border border-primary"
                    placeholder="Tu email"
                  />
                </div>
                <button className="btn btn-warning">Suscribirme</button>
              </form>
              <div className="hstack gap-2 justify-content-center justify-content-md-start">
                <a href="#" className="text-decoration-none">
                  <img src="/images/apple-app-store-badge.svg" alt="" />
                </a>
                <a href="#" className="text-decoration-none">
                  <img src="/images/google-play-badge.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4 bg-primary-dark">
        <div className="container d-flex">
          <span className="text-light text-opacity-50 my-auto">
            &copy; {new Date().getFullYear()} BasilOrien Template
          </span>
          <div className="ms-auto hstack gap-4">
            <a href="#" className="ms-auto link-light">
              <FontAwesomeIcon icon={["fab", "facebook-f"]} size="lg" />
            </a>
            <a href="#" className="ms-auto link-light">
              <FontAwesomeIcon icon={["fab", "twitter"]} size="lg" />
            </a>
            <a href="#" className="ms-auto link-light">
              <FontAwesomeIcon icon={["fab", "instagram"]} size="lg" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
