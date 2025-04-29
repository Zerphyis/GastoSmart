import { Pie, Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const GraficoComponent = ({ receitas, despesas }) => {
  if (receitas === undefined || despesas === undefined) {
    return <p>Carregando dados...</p>;
  }

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
      <h3>Gráfico de Receitas e Despesas</h3>
      <Pie data={graficoDados} />
      <Bar data={graficoDados} />
    </div>
  );
};

export default GraficoComponent;