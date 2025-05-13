// Importa o React e o arquivo de estilos
import React from "react";
import "./Chart.css";

// Componente funcional ChartTitle
// Recebe uma prop chamada 'text' que representa o título do gráfico
export const ChartTitle = ({ text }) => {
  return (
    // Renderiza um <h2> com a classe CSS "chart-title"
    // Essa classe pode ser usada para estilizar o título (cor, tamanho, espaçamento, etc.)
    <h2 className="chart-title">{text}</h2>
  );
};
