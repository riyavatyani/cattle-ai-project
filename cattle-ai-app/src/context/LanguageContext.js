import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const toggle = () => setLanguage(l => l === "en" ? "hi" : "en");

  return (
    <LanguageContext.Provider value={{ language, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return context;
}