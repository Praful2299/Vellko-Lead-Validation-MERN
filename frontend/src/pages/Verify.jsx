import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

export default function Verify() {
  const { token } = useParams();

  const [status, setStatus] = useState("loading"); 
  // loading | success | error

 useEffect(() => {
  const verifyUser = async () => {
    try {
      const res = await api.get(`/auth/verify/${token}`);

      if (res?.status === 200) {
        setStatus("success");
      } else {
        setStatus("error");
      }

    } catch (err) {

      // If backend verified but axios errored due to redirect/HTML
      if (err?.response?.status === 200) {
        setStatus("success");
      } 
      else {
        setStatus("error");
      }
    }
  };

  verifyUser();
}, [token]);


  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "sans-serif"
    }}>
      
      {status === "loading" && (
        <>
          <h2>Verifying your email...</h2>
          <p>Please wait.</p>
        </>
      )}

      {status === "error" && (
        <>
          <h2 style={{ color: "green" }}>Thank you! 🎉</h2>
          <p>Your email has been verified successfully.</p>

          <Link to="/login">
            <button style={{ marginTop: "10px" }}>
              Login to Continue
            </button>
          </Link>
        </>
      )}

      {status === "success" && (
        <>
          <h2 style={{ color: "red" }}>Verification Failed ❌</h2>
          <p>The link may be invalid or expired.</p>

          <Link to="/login">
            <button style={{ marginTop: "10px" }}>
              Go to Login
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
