// Importa React, ícones e o arquivo de estilo CSS
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import "./Register.css";

// Componente funcional Register que recebe:
// - onRegister: função chamada para registrar o usuário
// - onSwitch: função para redirecionar para a tela de login
export default function Register({ onRegister, onSwitch }) {
  // Estados para armazenar os valores dos campos e mensagens de erro
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Função chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Verifica se todos os campos foram preenchidos
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    // Verifica se a senha e a confirmação batem
    if (password !== confirmPassword) {
      setError("Senhas não batem");
      return;
    }

    // Chama a função de registro recebida por props
    onRegister(name, email, password);
  };

  return (
    // Container geral da tela de registro
    <div className="register-container">
      <div className="register-box">
        {/* Cabeçalho da página de registro */}
        <div className="register-header">
          <h1>GastoSmart</h1>
          <p>Crie uma conta para começar</p>
        </div>

        <div className="register-card">
          <h2>Registrar</h2>

          {/* Exibe erro se existir */}
          {error && <div className="register-error">{error}</div>}

          {/* Formulário de registro */}
          <form onSubmit={handleSubmit} className="register-form">

            {/* Campo Nome */}
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome Completo"
                />
              </div>
            </div>

            {/* Campo Email */}
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

            {/* Campo Senha */}
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

            {/* Campo Confirmar Senha */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirme sua Senha</label>
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

            {/* Botão Criar Conta */}
            <button type="submit" className="register-button">
              Criar Conta
            </button>
          </form>

          {/* Rodapé com botão para ir para a tela de login */}
          <div className="register-footer">
            <p>
              Você já tem uma conta?{" "}
              {/* Redirecionamento: chama a função onSwitch para voltar para a tela de login */}
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
