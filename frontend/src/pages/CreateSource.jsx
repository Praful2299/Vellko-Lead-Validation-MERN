import { useState } from "react";
import api from "../utils/axios";
import "./createSource.css";

export default function CreateSource() {
  const [name, setName] = useState("");
  const [source, setSource] = useState(null);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/sources/create", { sourceName: name });
      setSource(res.data.source);
      setPopup(true);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-wrapper">

      <h2>Create Source</h2>

      <form onSubmit={submit} className="create-form">
        <input
          placeholder="Enter Source Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>


      {/* OPTIONAL — Styled Display Card */}
    {source && !popup && (
  <div className="source-card">
    <h3>Source Created </h3>

    <div className="source-info">

      <div className="source-row">
        <span>Source ID</span>
        <code>{source.sourceId}</code>
      </div>

      <div className="source-row">
        <span>API Key</span>
        <code>{source.apiKey}</code>
      </div>

    </div>
  </div>
)}


      {/* POPUP */}
      {popup && (
        <div className="popup-overlay">
          <div className="popup-card success">

            <h3>Source Created  </h3>
            <p>Your credentials are generated</p>

          <div className="popup-info">

  <div className="popup-row">
    <span>Source ID</span>
    <code>{source?.sourceId}</code>
  </div>

  <div className="popup-row">
    <span>API Key</span>
    <code>{source?.apiKey}</code>
  </div>

</div>

            <button onClick={()=>setPopup(false)}>
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
