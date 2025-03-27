import React, { createContext, useState, useEffect } from 'react';

export const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [temaEscuro, setTemaEscuro] = useState(() => {
    return JSON.parse(localStorage.getItem('temaEscuro')) || false;
  });

  const alternarTema = () => {
    setTemaEscuro(!temaEscuro);
  };

  useEffect(() => {
    localStorage.setItem('temaEscuro', JSON.stringify(temaEscuro));
  }, [temaEscuro]);

  return (
    <TemaContext.Provider value={{ temaEscuro, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
};