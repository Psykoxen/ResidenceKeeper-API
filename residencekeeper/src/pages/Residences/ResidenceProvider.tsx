// ResidenceProvider.tsx

import React, { createContext, useContext, useState } from "react";

interface ResidenceContextType {
  selectedHomeId: number | null;
  setSelectedHomeId: React.Dispatch<React.SetStateAction<number | null>>;
}

const defaultValue: ResidenceContextType = {
  selectedHomeId: null,
  setSelectedHomeId: () => {}, // Provide a dummy function
};

const ResidenceContext = createContext(defaultValue);

export function ResidenceProvider({ children }: { children: React.ReactNode }) {
  const [selectedHomeId, setSelectedHomeId] = useState<number | null>(null);

  return (
    <ResidenceContext.Provider value={{ selectedHomeId, setSelectedHomeId }}>
      {children}
    </ResidenceContext.Provider>
  );
}

export function useResidence() {
  return useContext(ResidenceContext);
}
