"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CompanySectionContext = createContext(null);

export function CompanySectionProvider({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sectionFromUrl = searchParams.get("section") || "companyDetails";
  const [activeSection, setActiveSection] = useState(sectionFromUrl);

  // Keep state in sync with URL 
  useEffect(() => {
    setActiveSection(sectionFromUrl);
  }, [sectionFromUrl]);

  const updateSection = (section) => {
    setActiveSection(section);
    router.push(`?section=${section}`, { scroll: false });
  };

  return (
    <CompanySectionContext.Provider
      value={{ activeSection, setActiveSection: updateSection }}
    >
      {children}
    </CompanySectionContext.Provider>
  );
}

export function useCompanySection() {
  const context = useContext(CompanySectionContext);
  if (!context) {
    throw new Error(
      "useCompanySection must be used inside CompanySectionProvider"
    );
  }
  return context;
}
