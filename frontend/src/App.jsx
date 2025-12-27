import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import Sources from "./pages/Sources";
import CreateSource from "./pages/CreateSource";
import ValidateLead from "./pages/ValidateLead";
import Leads from "./pages/Leads";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/sources"
          element={
            <PrivateRoute>
              <Sources />
            </PrivateRoute>
          }
        />

        <Route
          path="/sources/create"
          element={
            <PrivateRoute>
              <CreateSource />
            </PrivateRoute>
          }
        />

        <Route
          path="/leads/validate"
          element={
            <PrivateRoute>
              <ValidateLead />
            </PrivateRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <PrivateRoute>
              <Leads />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
