import React, { createContext, useContext, useEffect, useState } from "react";
import { checkSession } from "../pages/api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(function () {
    if (!isChecked) {
      checkSession().then(function (result) {
        setIsAuthenticated(result);
        setIsChecked(true);
        console.log(result);
      });
    }
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, isChecked }}>
      {!isChecked ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
