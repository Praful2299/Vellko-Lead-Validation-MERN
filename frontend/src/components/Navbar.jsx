import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {

  const navigate = useNavigate();

  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{display:"flex", justifyContent:"space-between", padding:"10px", borderBottom:"1px solid #ddd"}}>
      <h3>Vellko CRM</h3>

      {(
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
