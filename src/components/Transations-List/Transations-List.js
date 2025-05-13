
import { XCircle } from "lucide-react";
import { formatDate } from "../../lib/Utils";
import "./TransationList.css";

export default function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <div>
      <h3 className="transaction-title">Histórico-Transações</h3>
      <ul className="transaction-list">
        {transactions.length === 0 ? (
          <li className="transaction-empty">Sem Transações Ainda</li>
        ) : (
          transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={`transaction-item ${
                transaction.amount < 0 ? "transaction-expense" : "transaction-income"
              }`}
            >
              <div className="transaction-details">
                <span className="transaction-text">{transaction.text}</span>
                {transaction.date && (
                  <p className="transaction-date">{formatDate(transaction.date)}</p>
                )}
              </div>
              <div className="transaction-meta">
                <span className="transaction-amount">
                  {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="transaction-delete"
                  aria-label="Delete transaction"
                >
                  <XCircle size={18} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}