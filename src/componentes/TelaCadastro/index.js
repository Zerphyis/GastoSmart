import { useNavigate } from 'react-router-dom';
import './TelaCadastro.css';
import React, { useState } from 'react';  

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    const novoUsuario = { nome, email, senha };
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    navigate('/');
  };

  return (
    <div className="cadastro-box">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleCadastro}>
        <div className="input-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
