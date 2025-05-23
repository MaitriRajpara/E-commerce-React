import { createContext, useContext, useState, type ReactNode } from "react";
import type { SortContextType } from "../../Type/Type";

const SortContext = createContext<SortContextType | undefined>(undefined);

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sort, setSort] = useState("");

  return (
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = (): SortContextType => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
};
