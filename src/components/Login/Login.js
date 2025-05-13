import { useState } from "react";
import { Mail, Lock } from "lucide-react"; // Ícones para email e senha
import "./Login.css"; 

// Componente funcional Login que recebe duas funções por props:
// onLogin → chamada ao fazer login
// onSwitch → chamada para redirecionar para a tela de registro
export default function Login({ onLogin, onSwitch }) {
  // Estados locais para armazenar email, senha e mensagens de erro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Função executada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Verifica se os campos de email e senha estão preenchidos
    if (!email || !password) {
      setError("Por favor, coloque o Email e a Senha");
      return;
    }

    // Chama a função de login recebida por props
    onLogin(email, password);
  };

  return (
    // Container principal do formulário de login
    <div className="login-container">
      <div className="login-box">
        {/* Cabeçalho com o nome da aplicação */}
        <div className="login-header">
          <h1>Gasto$mart</h1>
          <p>Gerencie suas finanças</p>
        </div>

        {/* Cartão do formulário */}
        <div className="login-card">
          <h2>Login</h2>

          {/* Exibe mensagem de erro, se houver */}
          {error && <div className="login-error">{error}</div>}

          {/* Formulário de login */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Campo de email */}
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

            {/* Campo de senha */}
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

            {/* Botão para enviar o formulário */}
            <button type="submit" className="login-button">
              Logar
            </button>
          </form>

          {/* Rodapé com opção para redirecionar para o registro */}
          <div className="login-footer">
            <p>
              Você não tem Conta?{" "}
              {/* Chama a função onSwitch ao clicar, geralmente usada para mudar para a tela de cadastro */}
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
