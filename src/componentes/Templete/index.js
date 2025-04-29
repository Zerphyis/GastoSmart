import { useNavigate } from 'react-router-dom';
import './Template.css';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinanceApp = ({ usuario }) => {
  const [transacoes, setTransacoes] = useState(() => {
    return JSON.parse(localStorage.getItem('transacoes')) || [];
  });
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const [isEditing, setIsEditing] = useState(false);
  const [transacaoEditando, setTransacaoEditando] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
  }, [transacoes]);

  if (!usuario) {
    navigate('/login');
    return null;
  }

  const adicionarTransacao = () => {
    if (!descricao || !valor || isNaN(parseFloat(valor))) return alert('Preencha todos os campos com valores válidos!');
    const novaTransacao = { id: Date.now(), descricao, valor: parseFloat(valor), tipo };
    setTransacoes([...transacoes, novaTransacao]);
    setDescricao('');
    setValor('');
  };

  const excluirTransacao = (id) => {
    setTransacoes(transacoes.filter((transacao) => transacao.id !== id));
  };

  const editarTransacao = () => {
    if (!descricao || !valor || isNaN(parseFloat(valor))) return alert('Preencha todos os campos com valores válidos!');
    setTransacoes(transacoes.map((transacao) =>
      transacao.id === transacaoEditando.id
        ? { ...transacao, descricao, valor: parseFloat(valor), tipo }
        : transacao
    ));
    setIsEditing(false);
    setDescricao('');
    setValor('');
    setTransacaoEditando(null);
  };

  const iniciarEdicao = (transacao) => {
    setDescricao(transacao.descricao);
    setValor(transacao.valor);
    setTipo(transacao.tipo);
    setTransacaoEditando(transacao);
    setIsEditing(true);
  };

  const saldoTotal = transacoes.reduce((acc, transacao) => {
    return transacao.tipo === 'receita' ? acc + transacao.valor : acc - transacao.valor;
  }, 0);

  const irParaGraficos = () => {
    navigate('/grafico');
  };

  return (
    <div className="finance-container">
      <div className="finance-box">
        <h1>Bem-vindo, {usuario.nome || 'Usuário'}</h1>
        <p className="saldo-total">Saldo: R$ {saldoTotal.toFixed(2)}</p>

        <div className="transacao-form">
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            disabled={isEditing && !transacaoEditando}
            className="input-claro"
          />
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            disabled={isEditing && !transacaoEditando}
            className="input-claro"
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={isEditing && !transacaoEditando}
            className="input-claro"
          >
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
          <button
            onClick={isEditing ? editarTransacao : adicionarTransacao}
            className="btn-claro"
          >
            {isEditing ? 'Salvar Edição' : 'Adicionar'}
          </button>
        </div>

        <div className="buttons">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-claro"
          >
            {isEditing ? 'Cancelar Edição' : 'Editar Transações'}
          </button>
          <button
            onClick={irParaGraficos}
            className="btn-claro"
          >
            Ver Gráficos
          </button>
        </div>

        <div className="transacoes-list">
          <h3>Transações</h3>
          <table className="tabela-claro">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao) => (
                <tr key={transacao.id}>
                  <td>{transacao.descricao}</td>
                  <td>R$ {transacao.valor.toFixed(2)}</td>
                  <td>{transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}</td>
                  <td>
                    <button
                      onClick={() => excluirTransacao(transacao.id)}
                      className="btn-claro"
                    >
                      Excluir
                    </button>
                    <button
                      onClick={() => iniciarEdicao(transacao)}
                      className="btn-claro"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceApp;
