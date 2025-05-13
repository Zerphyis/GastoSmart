import './Header.css';

export default function Header({ userName }) {
  return (
    <div className="header-container">
      <h1 className="header-title">GastoSmart</h1>
      {userName && <p className="header-subtitle">Bem-Vindo de Volta, {userName}</p>}
    </div>
  );
}