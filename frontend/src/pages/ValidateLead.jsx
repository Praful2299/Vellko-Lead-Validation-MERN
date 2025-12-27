import { useState } from "react";
import api from "../utils/axios";

export default function ValidateLead() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    apiKey: "",
    sourceId: ""
  });

  const [result, setResult] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/leads/validate", form);
    setResult(res.data.status);
  };

  return (
    <div>
      <h2>Validate Lead</h2>

      <form onSubmit={submit}>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input placeholder="Phone" onChange={(e)=>setForm({...form,phone:e.target.value})} />
        <input placeholder="Source ID" onChange={(e)=>setForm({...form,sourceId:e.target.value})} />
        <input placeholder="API Key" onChange={(e)=>setForm({...form,apiKey:e.target.value})} />

        <button>Validate</button>
      </form>

      {result && <h3>Status: {result}</h3>}
    </div>
  );
}
