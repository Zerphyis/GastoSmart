import React, { createContext, useState, useEffect } from 'react';

export const TemaContext = createContext(null); 

export const TemaProvider = ({ children }) => {
  const temaSalvo = localStorage.getItem('temaEscuro') === 'true';
  const [temaEscuro, setTemaEscuro] = useState(temaSalvo);

  const toggleTema = () => {
    setTemaEscuro((prevTema) => {
      const novoTema = !prevTema;
      localStorage.setItem('temaEscuro', novoTema);
      return novoTema;
    });
  };

  useEffect(() => {
    document.body.classList.toggle('tema-escuro', temaEscuro);
    document.body.classList.toggle('tema-claro', !temaEscuro);
  }, [temaEscuro]);

  return (
    <TemaContext.Provider value={{ temaEscuro, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
};
