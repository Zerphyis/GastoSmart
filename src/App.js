import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/DashBoard";

function App() {
  // Estado que armazena o usuário logado
  const [user, setUser] = useState(null);

  // Estado que define se estamos na tela de registro ou login
  const [isRegistering, setIsRegistering] = useState(false);

  // Estado que armazena as transações do usuário logado
  const [transactions, setTransactions] = useState([]);

  // Verifica se há um usuário logado e carrega as transações do localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);

      // Carrega transações do usuário logado
      const userTransactions = localStorage.getItem(`transactions_${parsedUser.email}`);
      if (userTransactions) {
        setTransactions(JSON.parse(userTransactions));
      }
    }
  }, []);

  // Sempre que as transações mudam, salva no localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`transactions_${user.email}`, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  // Função que trata o login do usuário
  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      // Usuário autenticado
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      const userTransactions = localStorage.getItem(`transactions_${email}`);
      if (userTransactions) {
        setTransactions(JSON.parse(userTransactions));
      }
    } else {
      alert("Email ou senha inválidos");
    }
  };

  // Função que trata o registro de um novo usuário
  const handleRegister = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Verifica se o email já está cadastrado
    if (users.some((u) => u.email === email)) {
      alert("Já existe um usuário com este email");
      return;
    }

    // Cria e salva o novo usuário
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Loga o novo usuário automaticamente após registro
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setIsRegistering(false);
  };

  // Função que realiza logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // Adiciona uma nova transação à lista
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Math.floor(Math.random() * 1000000), // ID aleatório
      date: new Date().toISOString(), // Data atual
    };

    setTransactions([...transactions, newTransaction]);
  };

  // Remove uma transação pelo ID
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  // Renderiza a tela de login ou registro se o usuário não estiver logado
  if (!user) {
    if (isRegistering) {
      return <Register onRegister={handleRegister} onSwitch={() => setIsRegistering(false)} />;
    } else {
      return <Login onLogin={handleLogin} onSwitch={() => setIsRegistering(true)} />;
    }
  }

  // Renderiza o painel principal (Dashboard) se o usuário estiver logado
  return (
    <Dashboard
      user={user}
      transactions={transactions}
      onAddTransaction={addTransaction}
      onDeleteTransaction={deleteTransaction}
      onLogout={handleLogout}
    />
  );
}

export default App;
