import './IncomeExpenses.css';

export default function IncomeExpenses({ transactions }) {
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  return (

    <div className="income-expenses-container">
      <div className="income-expenses-content">
        <div className="income-expenses-section">
          <h4 className="income-expenses-title">Renda</h4>
          <p className="income-text">+${income}</p>
        </div>
        <div className="vertical-divider"></div>
        <div className="income-expenses-section">
          <h4 className="income-expenses-title">Despesa</h4>
          <p className="expense-text">-${expense}</p>
        </div>
      </div>
    </div>
  );
}
