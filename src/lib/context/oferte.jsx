"use client"

import { createContext } from "react";
import { useOferte, useOferteInputs } from "../hooks/oferte";

export const OferteContext = createContext();

export function OferteProvider({children}) {

  const [oferte, oferteInputs] = [useOferte(), useOferteInputs()];

  return (
    <OferteContext.Provider value={{...oferte, ...oferteInputs}}>
      {children}
    </OferteContext.Provider>
  );
}