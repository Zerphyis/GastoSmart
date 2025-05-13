import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import "./Login.css";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Porfavor Coloque o Email e Senha");
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Gasto$mart</h1>
          <p>Gerencie suas finanças</p>
        </div>

        <div className="login-card">
          <h2>Login</h2>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu@email.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="login-button">
              Logar
            </button>
          </form>

          <div className="login-footer">
            <p>
             Você não tem Conta?{" "}
              <button onClick={onSwitch} className="register-button">
                Registrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
