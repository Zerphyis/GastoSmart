import React, { useState } from "react";
import "./AddTransations.css";

export default function AddTransaction({ onAddTransaction }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || !amount.trim()) {
      setError("Por favor, insira a descrição e o valor");
      return;
    }

    const amountValue = Number.parseFloat(amount);

    if (isNaN(amountValue)) {
      setError("Por favor, insira um número válido para o valor");
      return;
    }

    onAddTransaction({
      text,
      amount: amountValue,
    });

    setText("");
    setAmount("");
    setError("");
  };

  return (
    <div>
      <h3 className="add-transaction-title">Adicionar Nova Transações</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="text" className="form-label">
           Descrição
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Adicionar Descrição.."
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="amount" className="form-label">
          Quantia
            <span className="amount-info">(negativo - despesa, positivo - receita)</span>
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Adicionar Quantia.."
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
        Adicionar Transação
        </button>
      </form>
    </div>
  );
}
