import React, { createContext, useState, useContext } from 'react';


export const TemaContext = createContext();


export const TemaProvider = ({ children }) => {
  const [temaEscuro, setTemaEscuro] = useState(false);

  const alternarTema = () => {
    setTemaEscuro(!temaEscuro);
  };

  return (
    <TemaContext.Provider value={{ temaEscuro, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);
