import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.54:3002/api";

//registro
export async function signUp(userData) {
  try {
    const response = await axios.post("/auth/register", { ...userData });
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status || 500 };
  }
}

//login
export async function logiIn(userData) {
  try {
    const response = await axios.post(
      "/auth/login",
      { ...userData },
      { withCredentials: true }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status || 500 };
  }
}

//check session
export async function checkSession() {
  try {
    const response = await axios.get("/auth/check", { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

//logout

export async function logout() {
  try {
    const response = await axios.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status || 500 };
  }
}

//pass recovery

export async function passwordRecovery(email) {
  try {
    const response = await axios.post("/auth/password_recover", { email });
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status || 500 };
  }
}
