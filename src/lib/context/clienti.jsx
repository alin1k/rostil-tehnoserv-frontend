"use client"

import { createContext } from "react";
import { useClient, useClientInputs } from "../hooks/clienti";

export const ClientiContext = createContext();

export function ClientiProvider({children}) {

  const [clienti, clientiInputs] = [useClient(), useClientInputs()];

  return (
    <ClientiContext.Provider value={{...clienti, ...clientiInputs}}>
      {children}
    </ClientiContext.Provider>
  );
}
