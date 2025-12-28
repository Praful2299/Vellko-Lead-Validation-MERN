import logo from "../assets/vellko-logo.png";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-wrapper">
      <header className="auth-header">
        <img src={logo} alt="Vellko" />
      </header>

      <div className="auth-card">
        {children}
      </div>

      <footer className="auth-footer">
        © {new Date().getFullYear()} Vellko — All Rights Reserved
      </footer>
    </div>
  );
}
