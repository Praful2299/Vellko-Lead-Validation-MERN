import { useState } from "react";
import api from "../utils/axios";

export default function CreateSource() {
  const [name, setName] = useState("");
  const [source, setSource] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/sources/create", { sourceName: name });
    setSource(res.data.source);
  };

  return (
    <div>
      <h2>Create Source</h2>

      <form onSubmit={submit}>
        <input placeholder="Source Name" onChange={(e)=>setName(e.target.value)} />
        <button>Create</button>
      </form>

      {source && (
        <>
          <p>Source ID: {source.sourceId}</p>
          <p>API Key: {source.apiKey}</p>
        </>
      )}
    </div>
  );
}
