import React, { useState } from "react";

import boardContext from "./board-context";
import { TOOL_ITEMS } from "../constants";

// children prop always chaiye hoga provider mei
const BoardProvider = ({ children }) => {
  const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);

  const handleToolItemClick = (tool) => {
    setActiveToolItem(tool);
  };

  const boardContextValue = {
    activeToolItem,
    handleToolItemClick,
  };

  return (
    <boardContext.Provider
      value={boardContextValue} // now boardContextValue ke dono variable, methods ko har jagah use kar sakta hu
    >
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
