import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <Link to="/sources/create">Create Source</Link><br />
      <Link to="/sources">View Sources</Link><br />
      <Link to="/leads/validate">Validate Lead</Link><br />
      <Link to="/leads">View Leads</Link><br />
    </div>
  );
}
