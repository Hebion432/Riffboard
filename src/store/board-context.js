import { createContext } from "react";

// yaha mujhe toolbar ke items chaiye
const boardContext = createContext({
  activeToolItem: "",
  toolActionType: "",
  elements: [],
  changeToolHandler: () => {},
  boardMouseDownHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
});

export default boardContext;
