// Importa React e o arquivo de estilos CSS
import React from "react";
import "./Chart.css";

// Componente funcional ChartContainer
// Ele recebe o conteúdo interno como "children" (por exemplo, o gráfico)
export const ChartContainer = ({ children }) => {
  return (
    // Div com a classe "chart-container" (estilizada no Chart.css)
    // Essa div serve como contêiner visual para o gráfico
    <div className="chart-container">
      {children} {/* Renderiza qualquer conteúdo passado como filho */}
    </div>
  );
};
