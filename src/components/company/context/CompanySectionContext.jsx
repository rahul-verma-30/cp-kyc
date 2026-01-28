"use client";

import { createContext, useContext, useState } from "react";

const CompanySectionContext = createContext(null);

export function CompanySectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState("companyDetails");

  return (
    <CompanySectionContext.Provider
      value={{ activeSection, setActiveSection }}
    >
      {children}
    </CompanySectionContext.Provider>
  );
}

export function useCompanySection() {
  const context = useContext(CompanySectionContext);
  if (!context) {
    throw new Error("useCompanySection must be used inside CompanySectionProvider");
  }
  return context;
}
