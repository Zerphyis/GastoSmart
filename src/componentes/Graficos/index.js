import React from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoComponent = ({ receitas, despesas }) => {
  const graficoDados = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        data: [receitas, despesas],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  return (
    <div>
      <Pie data={graficoDados} />
      <Bar data={graficoDados} />
    </div>
  );
};

export default GraficoComponent;