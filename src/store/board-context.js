import { createContext } from "react";

// yaha mujhe toolbar ke items chaiye
const boardContext = createContext({
  activeToolItem: "",
  elements: [],
  handleToolItemClick: () => {},
});

export default boardContext;
