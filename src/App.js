import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/DashBoard";

function App() {
  const [user, setUser] = useState(null);

  const [isRegistering, setIsRegistering] = useState(false);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);

      const userTransactions = localStorage.getItem(`transactions_${parsedUser.email}`);
      if (userTransactions) {
        setTransactions(JSON.parse(userTransactions));
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`transactions_${user.email}`, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
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

  const handleRegister = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      alert("Já existe um usuário com este email");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setIsRegistering(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Math.floor(Math.random() * 1000000), 
      date: new Date().toISOString(),
    };

    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  if (!user) {
    if (isRegistering) {
      return <Register onRegister={handleRegister} onSwitch={() => setIsRegistering(false)} />;
    } else {
      return <Login onLogin={handleLogin} onSwitch={() => setIsRegistering(true)} />;
    }
  }

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
