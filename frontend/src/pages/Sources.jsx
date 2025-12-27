import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Sources() {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    api.get("/sources").then(res => setSources(res.data));
  }, []);

  return (
    <div>
      <h2>My Sources</h2>

      {sources.map(s => (
        <div key={s._id}>
          <p>{s.sourceName}</p>
          <p>{s.sourceId}</p>
          <p>{s.apiKey}</p>
        </div>
      ))}
    </div>
  );
}
