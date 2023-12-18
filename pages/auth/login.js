import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Layout from "../../components/layout";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { logiIn } from "../api/axios";
import { useRouter } from "next/dist/client/router";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { isAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  //changeHandler
  function onChangeHandler(e) {
    setErrors((lastErrors) => ({
      ...lastErrors,
      [e.target.name]: "",
    }));

    setUserData((lastState) => ({
      ...lastState,
      [e.target.name]: e.target.value,
    }));
  }

  //submit handler
  async function onSubmitHandler(e) {
    e.preventDefault();

    try {
      const result = await logiIn(userData);
      const bool = result.status === 200;
      const data = result?.data;
      const dataErrors = data?.data;

      console.log(result);

      if (dataErrors?.length) {
        dataErrors.forEach((err) => {
          const name = err.path;
          const message = err.message;
          setErrors((lastErrors) => ({
            ...lastErrors,
            [name]: message,
          }));
        });
      }
      Swal.fire({
        title: data?.message,
        icon: bool ? "success" : "error",
        text: bool ? "Iniciaste sesión" : "",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed && bool) {
          window.location.reload();
        }
      });

      console.log(errors);
    } catch (error) {
      alert("Se produjo un error");
    }
  }

  if (isAuthenticated) {
    router.push("/");
  }

  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Iniciar sesión</h4>
              <form onSubmit={(e) => onSubmitHandler(e)} className="row g-2">
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@ejemplo.com"
                    name="email"
                    value={userData.email}
                    onChange={(e) => onChangeHandler(e)}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={(e) => onChangeHandler(e)}
                    value={userData.password}
                  />
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
                <div className="col-md-12">
                  <Link href="/auth/forgot-password">
                    <a className="text-decoration-none">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </Link>
                </div>
                <div className="col-md-12 mt-4">
                  <button type="submit" className="btn btn-primary w-100">
                    Iniciar sesión
                  </button>
                </div>
                <div className="col-md-12">
                  <div className="row g-2">
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                    <div className="col-auto align-self-center text-muted">
                      O continua con
                    </div>
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="hstack gap-2 justify-content-center">
                    <button className="btn-facebook rounded-circle">
                      <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    </button>
                    <button className="btn-google rounded-circle">
                      <FontAwesomeIcon icon={["fab", "google"]} />
                    </button>
                    <button className="btn-apple rounded-circle">
                      <FontAwesomeIcon icon={["fab", "apple"]} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <hr className="text-muted my-0" />
            <div className="text-center p-3">
              ¿No tenes una cuenta?{" "}
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

Login.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default Login;
