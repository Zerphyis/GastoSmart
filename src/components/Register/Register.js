import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import "./Register.css";

export default function Register({ onRegister, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Porfavor preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Senhas não batem");
      return;
    }

    onRegister(name, email, password);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h1>GastoSmart</h1>
          <p>Cria uma conta para começar</p>
        </div>

        <div className="register-card">
          <h2>Registrar</h2>

          {error && <div className="register-error">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome de Usuário"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirma sua Senha</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="register-button">
              Criar Conta
            </button>
          </form>

          <div className="register-footer">
            <p>
              Você Já Tem Uma Conta?{" "}
              <button onClick={onSwitch} className="switch-button">
               Logar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
