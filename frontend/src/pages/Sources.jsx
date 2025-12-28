import { useEffect, useState } from "react";
import api from "../utils/axios";
import "./sources.css";

export default function Sources() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/sources")
      .then(res => setSources(res.data))
      .finally(() => setLoading(false));
  }, []);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="sources-wrapper">

      <header className="sources-header">
        <h2>My Sources</h2>
        <p>Manage and monitor all your traffic sources</p>
      </header>

      {/* Loading */}
      {loading && <p className="loading">Loading sources...</p>}

      {/* Empty state */}
      {!loading && sources.length === 0 && (
        <div className="empty">
          <h3>No sources found</h3>
          <p>Create a source to get started</p>
        </div>
      )}

      {/* Table */}
      {!loading && sources.length > 0 && (
        <div className="sources-table">

          <div className="table-head">
            <span>Source Name</span>
            <span>Source ID</span>
            <span>API Key</span>
          </div>

          {sources.map(s => (
            <div key={s._id} className="table-row">

              <span className="source-name">{s.sourceName}</span>

              <span className="badge" onClick={() => copy(s.sourceId)}>
                {s.sourceId}
              </span>

              <span className="badge key" onClick={() => copy(s.apiKey)}>
                {s.apiKey}
              </span>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
