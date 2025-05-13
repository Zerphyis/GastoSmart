import React from "react";

export const ChartTooltipContent = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="custom-tooltip">
      <p>{label}</p>
      <p>
        <strong>{payload[0].value}</strong>
      </p>
    </div>
  );
};
