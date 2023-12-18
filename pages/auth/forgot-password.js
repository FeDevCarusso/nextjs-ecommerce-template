import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Layout from "../../components/layout";
import { passwordRecovery } from "../api/axios";
import { useState } from "react";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function passwordRecoveryHandler(e) {
    e.preventDefault();
    try {
      const result = await passwordRecovery(email);
      const bool = result?.status === 200;
      const errorMessage = result?.data?.data[0]?.message;

      if (!bool && errorMessage) {
        setError(errorMessage);
      } else {
        setSent(true);
      }

      Swal.fire({
        title: bool ? "Listo" : "Se produjo un error",
        icon: bool ? "success" : "error",
        text: result?.data?.message || "Sin respuesta",
      });
    } catch (error) {
      console.log(error);
      alert("Se produjo un error");
    }
  }

  return sent ? (
    <div
      style={{ height: "300px" }}
      className="border d-flex flex-column justify-content-center align-items-center border-1 rounded bg-light px-3 py-2 small"
    >
      <h2>Mail enviado con éxito</h2>
      <p style={{ fontSize: "large" }}>
        Volver a la página de <Link href={"/auth/login"}>Inicio de sesión</Link>
      </p>
    </div>
  ) : (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-3">
                Recuperar contraseña
              </h4>
              <form
                onSubmit={(e) => {
                  passwordRecoveryHandler(e);
                }}
                className="row g-3"
              >
                <div className="col-md-12">
                  <label className="form-label">Tu email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@ejemplo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) {
                        setError("");
                      }
                    }}
                  />
                  {error && <span className="text-danger">{error}</span>}
                </div>
                <div className="col-md-12 mt-3">
                  <button className="btn btn-primary w-100">Enviar mail</button>
                </div>
                <div className="col-md-12">
                  <div className="border border-1 rounded bg-light px-3 py-2 small">
                    Si tu cuenta existe se enviará un email a este correo.
                  </div>
                </div>
              </form>
            </div>
            <hr className="text-muted my-0" />
            <div className="text-center p-3">
              ¿No tenés una cuenta?{" "}
              <Link href="/auth/sign-up">
                <a className="text-decoration-none fw-medium">Registrate</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

ForgotPassword.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default ForgotPassword;
