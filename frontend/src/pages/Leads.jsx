import { useEffect, useState } from "react";
import api from "../utils/axios";
import "./leads.css";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leads")
      .then(res => setLeads(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="leads-wrapper">

      <header className="leads-header">
        <h2>Leads</h2>
        <p>Track and manage incoming leads</p>
      </header>

      {/* Loading */}
      {loading && <p className="loading">Loading leads...</p>}

      {/* Empty state */}
      {!loading && leads.length === 0 && (
        <div className="empty">
          <h3>No leads yet</h3>
          <p>New leads will appear here</p>
        </div>
      )}

      {/* Leads Table */}
      {!loading && leads.length > 0 && (
        <div className="leads-table">

          <div className="table-head">
            <span>Email</span>
            <span>Phone</span>
            <span>Status</span>
          </div>

          {leads.map(l => (
            <div key={l._id} className="table-row">
              <span>{l.email}</span>
              <span>{l.phone}</span>

              <span
                className={`status ${
                  l.status === "valid"
                    ? "valid"
                    : l.status === "invalid"
                    ? "invalid"
                    : "pending"
                }`}
              >
                {l.status}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
