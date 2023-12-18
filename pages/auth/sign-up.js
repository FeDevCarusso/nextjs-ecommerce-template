import Link from "next/link";
import Layout from "../../components/layout";
import { useContext, useState } from "react";
import { signUp } from "../api/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";

// const cities = ["Quilmes", "Quilmes Oeste", "Varela"];

// const states = ["Buenos Aires"];

function SignUp() {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useRouter();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (userData.password !== userData.confirmPassword) {
      setErrors((lastErrors) => ({
        ...lastErrors,
        confirmPassword: "Las contraseñas no coinciden",
      }));

      return;
    }

    try {
      const result = await signUp(userData);
      const bool = result.status === 200;
      const data = result?.data;
      const dataErrors = data?.data;

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
        text: bool ? "Ahora podés iniciar sesión" : "",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed && bool) {
          navigate.push("/auth/login");
        }
      });

      console.log(errors);
    } catch (error) {
      alert("Se produjo un error");
    }
  }

  if (isAuthenticated) {
    navigate.push("/");
  }

  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">
                Registro de usuarios
              </h4>
              <form onSubmit={(e) => onSubmitHandler(e)} className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    name="firstName"
                    value={userData.firstName}
                  />
                  {errors.firstName && (
                    <span className="text-danger">{errors.firstName}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    name="lastName"
                    value={userData.lastName}
                  />
                  {errors.lastName && (
                    <span className="text-danger">{errors.lastName}</span>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    name="email"
                    value={userData.email}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    name="password"
                    value={userData.password}
                  />
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    name="confirmPassword"
                    value={userData.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <span className="text-danger">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
                <div className="col-md-12 mt-4">
                  <button className="btn btn-primary w-100">Registrate</button>
                </div>
                <div className="col-md-12">
                  <div className="text-muted bg-light rounded p-3 border small">
                    Clickeando el boton &lsquo;Registrate&lsquo; confirmas que
                    aceptas nuestros{" "}
                    <a href="#">Terminos de uso y politica de privacidad</a>.
                  </div>
                </div>
              </form>
              <hr className="text-muted" />
              <div className="text-center">
                ¿Ya tenés una cuenta?{" "}
                <Link href="/auth/login">
                  <a className="text-decoration-none fw-medium">
                    Iniciá sesión
                  </a>
                </Link>
              </div>
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

SignUp.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default SignUp;
