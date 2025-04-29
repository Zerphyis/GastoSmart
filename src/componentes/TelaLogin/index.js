import "./TelaLogin.css";
import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';

const TelaLogin = ({ setUsuarioLogado }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      setUsuarioLogado(usuario); 
      navigate('/home'); 
    } else {
      setErro('Email ou senha incorretos!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="login-btn">Entrar</button>
          <button
            type="button"
            onClick={() => navigate('/cadastro')}
            className="login-btn"
          >
            Cadastrar Usuário
          </button>
        </div>
      </form>
    </div>
  );
};

export default TelaLogin;
