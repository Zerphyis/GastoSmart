import React from "react";
import './Balance.css'; 

export default function Balance({ transactions }) {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const isPositive = Number.parseFloat(total) >= 0;

  return (
    <div className="balance-container">
      <h4 className="balance-title">Seu Saldo</h4>
      <h1 className={`balance-amount ${isPositive ? "positive" : "negative"}`}>${total}</h1>
    </div>
  );
}
