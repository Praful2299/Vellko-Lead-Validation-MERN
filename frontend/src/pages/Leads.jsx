import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get("/leads").then(res => setLeads(res.data));
  }, []);

  return (
    <div>
      <h2>Leads</h2>

      {leads.map(l => (
        <div key={l._id}>
          <p>Email: {l.email}</p>
          <p>Phone: {l.phone}</p>
          <p>Status: {l.status}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
