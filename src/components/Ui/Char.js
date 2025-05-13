// Importações do React e da biblioteca Recharts (gráficos)
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Importa o componente de tooltip customizado
import { ChartTooltipContent } from "./ChartTooltipContent";

// Componente Chart que recebe os dados via props
export const Chart = ({ data }) => {
  return (
    // O gráfico é responsivo e se ajusta à largura do contêiner pai
    <ResponsiveContainer width="100%" height={300}>
      {/* Gráfico de linha com os dados fornecidos */}
      <LineChart data={data}>
        
        {/* Eixo X - exibe o campo "name" de cada item no array de dados */}
        <XAxis dataKey="name" />

        {/* Eixo Y - gerado automaticamente com base nos valores */}
        <YAxis />

        {/* Tooltip - componente que mostra os detalhes quando passa o mouse */}
        {/* Aqui usamos um tooltip customizado definido em outro componente */}
        <Tooltip content={<ChartTooltipContent />} />

        {/* Linha do gráfico - tipo "monotone" (suave) e cor azul */}
        <Line type="monotone" dataKey="value" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
};
