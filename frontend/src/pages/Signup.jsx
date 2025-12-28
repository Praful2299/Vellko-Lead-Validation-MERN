import { useState } from "react";
import api from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../auth.css";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/signup", form);

      toast.success("Account created 🎉");

      // show popup
      setShowPopup(true);

    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <AuthLayout>
      <h2>Create your account</h2>

      <p className="subtitle">
        Join Vellko and grow with us
      </p>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <ToastContainer />

      {/* 🔔 POPUP UI */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Verify Your Email</h3>
            <p>
              A verification link has been sent to your email address.
              <br />
              Please verify your account before logging in.
            </p>

            <button onClick={handlePopupClose}>
              OK
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
