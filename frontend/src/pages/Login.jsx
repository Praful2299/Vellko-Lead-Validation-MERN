import { useState } from "react";
import api from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../auth.css";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

 const submit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const res = await api.post("/auth/login", form);
    toast.success("Welcome back 👋");
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthLayout>
      <h2>Login to your account</h2>
      <p className="subtitle">
        Access your dashboard
      </p>

      <form onSubmit={submit}>
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
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="switch">
        Don’t have an account? <Link to="/signup">Create one</Link>
      </p>

      <ToastContainer />
    </AuthLayout>
  );
}
