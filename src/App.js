import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/TelaLogin';
import Cadastro from './componentes/TelaCadastro';
import FinanceApp from './componentes/Templete';
import GraficoPage from './componentes/Graficos/';
import './App.css';
import { TemaProvider, TemaContext } from './componentes/TemaContext';

function App() {
  return (
    <TemaProvider>
      <Router>
        <ConteudoApp />
      </Router>
    </TemaProvider>
  );
}

function ConteudoApp() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const { temaEscuro, toggleTema } = useContext(TemaContext); 

  return (
    <div className={temaEscuro ? 'tema-escuro' : 'tema-claro'}>
      <Routes>
        <Route path="/" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<FinanceApp usuario={usuarioLogado} />} />
        <Route path="/grafico" element={<GraficoPage />} />
      </Routes>

    
      <div className="container-botao">
        <button onClick={toggleTema} className="btn-alternar-tema">
          {temaEscuro ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </div>
    </div>
  );
}

export default App;
