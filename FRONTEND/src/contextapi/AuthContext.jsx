import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isHospitalLoggedIn, setIsHospitalLoggedIn] = useState(() => {
    return sessionStorage.getItem('isHospitalLoggedIn') === 'true';
  });

  const [isBloodBankLoggedIn, setIsBloodBankLoggedIn] = useState(() => {
    return sessionStorage.getItem('isBloodBankLoggedIn') === 'true';
  });

  const [isOrganBankLoggedIn, setIsOrganBankLoggedIn] = useState(() => {
    return sessionStorage.getItem('isOrganBankLoggedIn') === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('isHospitalLoggedIn', isHospitalLoggedIn);
    sessionStorage.setItem('isBloodBankLoggedIn', isBloodBankLoggedIn);
    sessionStorage.setItem('isOrganBankLoggedIn', isOrganBankLoggedIn);
  }, [isHospitalLoggedIn, isBloodBankLoggedIn, isOrganBankLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
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
