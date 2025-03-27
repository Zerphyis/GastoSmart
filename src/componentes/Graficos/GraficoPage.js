import React from 'react';
import GraficoComponent from './index.js';

const GraficoPage = () => {
  return (
    <div>
      <h1>Gráficos</h1>
      <GraficoComponent receitas={1000} despesas={500} /> {}
    </div>
  );
};

export default GraficoPage;