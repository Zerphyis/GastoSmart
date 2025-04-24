import { useLocation } from 'react-router-dom';
import GraficoComponent from '../GraficoComponent';

const GraficoPage = () => {
  const location = useLocation();
  
  const { receitas, despesas } = location.state || {};

  if (!receitas || !despesas) {
    return (
      <div>
        <h2>Gráficos Financeiros</h2>
        <p>Erro: Dados de receitas e despesas não foram passados corretamente.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Gráficos Financeiros</h2>
      <GraficoComponent receitas={receitas} despesas={despesas} />
    </div>
  );
};

export default GraficoPage;