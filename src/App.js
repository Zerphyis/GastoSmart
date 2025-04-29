import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/TelaLogin';
import Cadastro from './componentes/TelaCadastro';
import FinanceApp from './componentes/Templete';
import GraficoPage from './componentes/Graficos/';
import './App.css';
import React, { useState } from 'react';  // Importando React e useState

function App() {
  return (
    <Router>
      <ConteudoApp />
    </Router>
  );
}

function ConteudoApp() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  return (
    <div className="tema-claro"> {/* Aplicando apenas o tema claro */}
      <Routes>
        <Route path="/" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<FinanceApp usuario={usuarioLogado} />} />
        <Route path="/grafico" element={<GraficoPage />} />
      </Routes>
    </div>
  );
}

export default App;