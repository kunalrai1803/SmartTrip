import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import PlanTripPage from "./pages/PlanTripPage";
import PlacesPage from "./pages/PlacesPage";
import ResultPage from "./pages/ResultPage";
import TripsPage from "./pages/TripsPage";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("smarttrip_user");
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/places"
        element={
          <PrivateRoute>
            <PlacesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/plan-trip"
        element={
          <PrivateRoute>
            <PlanTripPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/result"
        element={
          <PrivateRoute>
            <ResultPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/trips"
        element={
          <PrivateRoute>
            <TripsPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
