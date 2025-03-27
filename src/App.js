import React, { useState } from 'react'; 
import Login from './componentes/TelaLogin';
import Cadastro from './componentes/TelaCadastro';
import FinanceApp from './componentes/Templete';
import GraficoPage from './componentes/Graficos/GraficoPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { TemaProvider } from './componentes/TemaContext';

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  return (
    <TemaProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<FinanceApp usuario={usuarioLogado} />} />
            <Route path="/grafico" element={<GraficoPage />} />
          </Routes>
        </Router>
      </div>
    </TemaProvider>
  );
}

export default App;