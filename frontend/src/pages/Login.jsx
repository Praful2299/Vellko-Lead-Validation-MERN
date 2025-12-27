import { useState } from "react";
import api from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      // success
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!", { position: "top-center" });

      setTimeout(() => navigate("/dashboard"), 1000);
    } 
    catch (err) {
      const msg = err?.response?.data?.message || "Login failed";

      // 🟥 backend messages we prepared earlier
      if (msg === "User not found") {
        toast.error(
          <span>
            No account found.{" "}
            <Link to="/signup" style={{ color: "#61dafb" }}>
              Signup?
            </Link>
          </span>
        );
      }

      else if (msg === "Please verify your email first") {
        toast.warn("Please verify your email before logging in.", {
          position: "top-center",
        });
      }

      else if (msg === "Invalid credentials") {
        toast.error("Email or password is incorrect.");
      }

      else {
        toast.error(msg);
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button disabled={loading}>
          {loading ? "Processing..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>

      <ToastContainer />
    </div>
  );
}
