import { Link } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dash-wrapper">

      <header className="dash-header">
        <h2> Dashboard</h2>
        <p>Manage your marketing tools & leads in one place</p>
      </header>

      <div className="dash-grid">

        <Link to="/sources/create" className="dash-card">
          <div className="icon">🆕</div>
          <h3>Create Source</h3>
          <p>Generate and configure new traffic sources</p>
        </Link>

        <Link to="/sources" className="dash-card">
          <div className="icon">📁</div>
          <h3>View Sources</h3>
          <p>Monitor and manage existing sources</p>
        </Link>

        <Link to="/leads/validate" className="dash-card">
          <div className="icon">✔️</div>
          <h3>Validate Lead</h3>
          <p>Verify leads via API validation</p>
        </Link>

        <Link to="/leads" className="dash-card">
          <div className="icon">📊</div>
          <h3>View Leads</h3>
          <p>Track and review incoming leads</p>
        </Link>

      </div>
    </div>
  );
}
