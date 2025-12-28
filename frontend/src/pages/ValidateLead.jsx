import { useState } from "react";
import api from "../utils/axios";

export default function ValidateLead() {

  const [form, setForm] = useState({
    email: "",
    phone: "",
    apiKey: "",
    sourceId: ""
  });

  const [popup, setPopup] = useState(null);
  // success | email | phone | source | api | lead | required | server
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {

    if (!form.email || !form.phone || !form.apiKey || !form.sourceId)
      return "required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "email";

    if (!/^[0-9]{8,15}$/.test(form.phone))
      return "phone";

    return null;
  };

  const submit = async (e) => {
    e.preventDefault();

    const inputError = validateInputs();
    if (inputError) {
      setPopup(inputError);
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/leads/validate", form);

      if (res.data?.status === "valid") setPopup("success");
      else setPopup("lead");

    } catch (err) {

      const code = err?.response?.status;

      if (code === 401) setPopup("api");
      else if (code === 404) setPopup("source");
      else setPopup("server");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-wrapper">

      <h2>Validate Lead</h2>

      <form onSubmit={submit} className="lead-form">

        <input placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})} />

        <input placeholder="Phone"
          onChange={(e)=>setForm({...form,phone:e.target.value})} />

        <input placeholder="Source ID"
          onChange={(e)=>setForm({...form,sourceId:e.target.value})} />

        <input placeholder="API Key"
          onChange={(e)=>setForm({...form,apiKey:e.target.value})} />

        <button disabled={loading}>
          {loading ? "Validating..." : "Validate"}
        </button>
      </form>


      {/* ===== SUCCESS ===== */}
      {popup === "success" && (
        <Popup type="success"
          title="Lead Validated 🎉"
          msg="The lead has been verified successfully."
          setPopup={setPopup} />
      )}

      {/* ===== SPECIFIC ERRORS ===== */}

      {popup === "required" && (
        <Popup type="error"
          title="Missing Fields"
          msg="Please fill all fields before validating."
          setPopup={setPopup} />
      )}

      {popup === "email" && (
        <Popup type="error"
          title="Invalid Email"
          msg="Please enter a valid email address."
          setPopup={setPopup} />
      )}

      {popup === "phone" && (
        <Popup type="error"
          title="Invalid Phone Number"
          msg="Phone must contain 8–15 digits only."
          setPopup={setPopup} />
      )}

      {popup === "source" && (
        <Popup type="error"
          title="Invalid Source ID"
          msg="The Source ID you entered is not recognized."
          setPopup={setPopup} />
      )}

      {popup === "api" && (
        <Popup type="error"
          title="Invalid API Key"
          msg="Authentication failed. Please check your API key."
          setPopup={setPopup} />
      )}

      {popup === "lead" && (
        <Popup type="error"
          title="Lead Invalid"
          msg="Lead details do not match our records."
          setPopup={setPopup} />
      )}

      {popup === "server" && (
        <Popup type="error"
          title="Server Error"
          msg="Something went wrong. Please try again later."
          setPopup={setPopup} />
      )}

    </div>
  );
}


/* 🔥 Reusable Popup Component */
function Popup({ type, title, msg, setPopup }) {
  return (
    <div className="popup-overlay">
      <div className={`popup-card ${type}`}>
        <h3>{title}</h3>
        <p>{msg}</p>
        <button onClick={()=>setPopup(null)}>OK</button>
      </div>
    </div>
  );
}
