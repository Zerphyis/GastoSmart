import { useState } from "react";
import Swal from 'sweetalert2';
import Header from "../Header/Header";
import Balance from "../Balance/Balance";
import IncomeExpenses from "../IncomeExpenses/IncomeExpenses";
import TransactionList from "../Transations-List/Transations-List";
import AddTransaction from "../Add-Transations/AddTransations";
import Analytics from "../Analics/Analics";
import { LogOut, PieChart, History, Plus } from "lucide-react";
import './DashBoard.css'; 

export default function Dashboard({
  user,
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState("transactions");

  const handleLogout = () => {
    Swal.fire({
      title: 'Sair da Conta?',
      text: 'Tem certeza que deseja sair?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF3B30',
      cancelButtonColor: '#A9A9A9',
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-inner-container">
        <div className="dashboard-header">
          <Header userName={user.name} />
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={16} />
            <span>Sair da Conta</span>
          </button>
        </div>

        <div className="dashboard-grid">
          <Balance transactions={transactions} />
          <IncomeExpenses transactions={transactions} />
        </div>

        <div className="dashboard-tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "transactions" ? "active" : ""}`}
              onClick={() => setActiveTab("transactions")}
            >
              <History size={16} className="icon" />
              <span>Transações</span>
            </button>
            <button
              className={`tab ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <PieChart size={16} className="icon" />
              <span>Análise</span>
            </button>
            <button
              className={`tab ${activeTab === "add" ? "active" : ""}`}
              onClick={() => setActiveTab("add")}
            >
              <Plus size={16} className="icon" />
              <span>Adicionar Nova</span>
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "transactions" && (
              <TransactionList
                transactions={transactions}
                onDeleteTransaction={onDeleteTransaction}
              />
            )}
            {activeTab === "analytics" && <Analytics transactions={transactions} />}
            {activeTab === "add" && <AddTransaction onAddTransaction={onAddTransaction} />}
          </div>
        </div>
      </div>
    </div>
  );
}
