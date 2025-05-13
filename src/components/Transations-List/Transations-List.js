import { XCircle } from "lucide-react"; // Ícone de deletar
import { formatDate } from "../../lib/Utils"; // Função para formatar datas
import "./TransationList.css";

export default function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    // Lista todas as transações cadastradas
    <div>
      <h3 className="transaction-title">Histórico-Transações</h3>

      <ul className="transaction-list">
        {/* Verifica se não há transações */}
        {transactions.length === 0 ? (
          <li className="transaction-empty">Sem Transações Ainda</li>
        ) : (
          // Percorre e renderiza cada transação
          transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={`transaction-item ${
                transaction.amount < 0 ? "transaction-expense" : "transaction-income"
              }`} // Aplica estilo conforme tipo: despesa ou receita
            >
              {/* Detalhes da transação (descrição e data) */}
              <div className="transaction-details">
                <span className="transaction-text">{transaction.text}</span>
                {/* Mostra a data se existir */}
                {transaction.date && (
                  <p className="transaction-date">{formatDate(transaction.date)}</p>
                )}
              </div>

              {/* Valor e botão de deletar */}
              <div className="transaction-meta">
                <span className="transaction-amount">
                  {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                </span>

                {/* Botão de deletar a transação */}
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
