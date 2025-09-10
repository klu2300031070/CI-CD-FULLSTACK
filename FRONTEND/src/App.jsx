import { BrowserRouter } from 'react-router-dom';
import NavBar from './Hospital/NavBar';
import OrganNavBar from './organs/OrganNavBar';
import BloodNavBar from './blood/BloodNavBar';
import { AuthProvider, useAuth } from './contextapi/AuthContext';
import MainNavBar from './main/MainNavBar';

function AppContent() {
  const { isHospitalLoggedIn, isBloodBankLoggedIn, isOrganBankLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      {isHospitalLoggedIn ? (
        <NavBar />
      ) : isBloodBankLoggedIn ? (
        <BloodNavBar />
      ) : isOrganBankLoggedIn ? (
        <OrganNavBar />
      ) : (
        <MainNavBar />
      )}
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
