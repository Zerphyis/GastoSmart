// Componente funcional ChartTooltipContent
// Este componente é usado para personalizar o conteúdo do Tooltip
// Ele recebe as props: active, payload e label, que são fornecidas pelo componente Tooltip do Recharts
export const ChartTooltipContent = ({ active, payload, label }) => {
  
  // Verifica se o Tooltip deve ser mostrado
  // Se não estiver ativo ou se não houver dados para mostrar (payload vazio), o componente retorna null (não exibe nada)
  if (!active || !payload || !payload.length) return null;

  return (
    // Renderiza o conteúdo do Tooltip, que fica dentro de uma div com a classe "custom-tooltip"
    <div className="custom-tooltip">
      {/* Exibe o valor do eixo X (label) - geralmente o mês, data, etc. */}
      <p>{label}</p>
      {/* Exibe o valor associado ao ponto no gráfico (payload[0].value) */}
      <p>
        <strong>{payload[0].value}</strong> {/* O valor da chave 'value' é destacado */}
      </p>
    </div>
  );
};
