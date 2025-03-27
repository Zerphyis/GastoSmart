import React from 'react';

const TelaLogado = ({ usuario }) => {
  return (
    <section className="container">
      <h1 role="heading" aria-level="1">Bem-vindo, {usuario?.nome || 'Usuário'}!</h1>
    </section>
  );
};

export default TelaLogado;