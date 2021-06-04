import React, { createContext, useState, useContext } from "react";
import colors from "../styles/colors";

interface StatusBarContextData {
  color: string | null;
  handleAlterColor(color: string): void;
}

const StatusBarColorContext = createContext({} as StatusBarContextData);

const StatusBarColorProvider: React.FC = ({ children }) => {
  const [color, setColor] = useState<string | null>(colors.background);

  function handleAlterColor(color: string) {
    setColor(color);
  }

  return (
    <StatusBarColorContext.Provider value={{ color, handleAlterColor }}>
      {children}
    </StatusBarColorContext.Provider>
  );
};

function useStatusBar() {
  const context = useContext(StatusBarColorContext);

  const { color, handleAlterColor } = context;

  return { color, handleAlterColor };
}

export { StatusBarColorContext, StatusBarColorProvider, useStatusBar };
