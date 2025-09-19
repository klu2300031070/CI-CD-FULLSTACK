import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state from sessionStorage
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    sessionStorage.getItem("isAdminLoggedIn") === "true"
  );
  const [isHospitalLoggedIn, setIsHospitalLoggedIn] = useState(
    sessionStorage.getItem("isHospitalLoggedIn") === "true"
  );
  const [isBloodBankLoggedIn, setIsBloodBankLoggedIn] = useState(
    sessionStorage.getItem("isBloodBankLoggedIn") === "true"
  );
  const [isOrganBankLoggedIn, setIsOrganBankLoggedIn] = useState(
    sessionStorage.getItem("isOrganBankLoggedIn") === "true"
  );

  // Reset context state, keep sessionStorage
  const clearAllAuth = () => {
    setIsAdminLoggedIn(false);
    setIsHospitalLoggedIn(false);
    setIsBloodBankLoggedIn(false);
    setIsOrganBankLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isHospitalLoggedIn,
        setIsHospitalLoggedIn,
        isBloodBankLoggedIn,
        setIsBloodBankLoggedIn,
        isOrganBankLoggedIn,
        setIsOrganBankLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
