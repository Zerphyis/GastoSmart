import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2'; // Importando também o Pie

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoPage = () => {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    // Recupera as transações do localStorage
    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    setTransacoes(transacoes);
  }, []);

  const receitas = transacoes.filter((transacao) => transacao.tipo === 'receita');
  const despesas = transacoes.filter((transacao) => transacao.tipo === 'despesa');

  const receitasTotal = receitas.reduce((acc, transacao) => acc + transacao.valor, 0);
  const despesasTotal = despesas.reduce((acc, transacao) => acc + transacao.valor, 0);

  // Dados para o gráfico de barras
  const dataBar = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        label: 'Valor',
        data: [receitasTotal, despesasTotal],
        backgroundColor: ['#4caf50', '#f44336'], // Cor para receitas e despesas
        borderColor: ['#388e3c', '#d32f2f'],
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de pizza
  const dataPie = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        data: [receitasTotal, despesasTotal],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  return (
    <div>
      <h2>Gráficos de Transações</h2>

      {/* Gráfico de Barras */}
      <div>
        <h3>Gráfico de Barras</h3>
        <Bar data={dataBar} />
      </div>

      {/* Gráfico de Pizza */}
      <div>
        <h3>Gráfico de Pizza</h3>
        <Pie data={dataPie} />
      </div>
    </div>
  );
};

export default GraficoPage;