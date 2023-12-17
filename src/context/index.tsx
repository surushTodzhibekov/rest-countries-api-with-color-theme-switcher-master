import { createContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | null>(null);

interface DarkModeProviderProps {
  children: ReactNode;
}

function DarkModeProvider(props: DarkModeProviderProps): JSX.Element {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const initialDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  //---------------------------------------------------------------------------
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
