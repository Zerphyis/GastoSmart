import React, { useState } from "react";
import { PieChart, BarChart, LineChart, Pie, Bar, Line, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generatePDF } from "../../lib/GeneraitorPdf";
import { DownloadIcon } from "lucide-react";
import './Analics.css'; 

export default function Analytics({ transactions }) {
  const [chartType, setChartType] = useState("pie");

  const incomeTotal = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const pieData = [
    { name: "Receitas", value: incomeTotal, color: "#10b981" },
    { name: "Despesas", value: expenseTotal, color: "#ef4444" },
  ];

  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date || new Date());
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expense: 0 };
    }

    if (transaction.amount > 0) {
      acc[monthYear].income += transaction.amount;
    } else {
      acc[monthYear].expense += Math.abs(transaction.amount);
    }

    return acc;
  }, {});

  const timeSeriesData = Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split("/");
      const [bMonth, bYear] = b.month.split("/");
      return (
        new Date(Number(aYear), Number(aMonth) - 1).getTime() - new Date(Number(bYear), Number(bMonth) - 1).getTime()
      );
    });

  const handleDownloadPDF = () => {
    generatePDF(transactions, pieData, timeSeriesData);
  };

  return (
    <div>
      <div className="header-container">
        <h3 className="title">Análise Financeira</h3>
        <div className="button-container">
          <div className="chart-selector">
            <button onClick={() => setChartType("pie")} className={`chart-button ${chartType === "pie" ? "active" : ""}`} aria-label="Pie chart">
              <PieChart size={16} />
            </button>
            <button onClick={() => setChartType("bar")} className={`chart-button ${chartType === "bar" ? "active" : ""}`} aria-label="Bar chart">
              <BarChart size={16} />
            </button>
            <button onClick={() => setChartType("line")} className={`chart-button ${chartType === "line" ? "active" : ""}`} aria-label="Line chart">
              <LineChart size={16} />
            </button>
          </div>
          <button onClick={handleDownloadPDF} className="download-button">
            <DownloadIcon size={16} />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="no-data-message">
          <p>Nenhum dado de transação para exibir</p>
          <p className="small-text">Adicione algumas transações para ver suas análises finanças</p>
        </div>
      ) : (
        <div className="chart-container">
          {chartType === "pie" && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}

          {chartType === "bar" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeriesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Receita" />
                <Bar dataKey="expense" fill="#ef4444" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartType === "line" && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10b981" name="Receita" />
                <Line type="monotone" dataKey="expense" stroke="#ef4444" name="Despesas" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      <div className="summary-container">
        <h4 className="summary-title">Sumário</h4>
        <div className="summary-cards">
          <div className="summary-card">
            <p className="text-label">Renda total</p>
            <p className="text-value green-text">${incomeTotal.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <p className="text-label">Despesas totais</p>
            <p className="text-value red-text">${expenseTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
