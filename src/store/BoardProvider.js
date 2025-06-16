import React, { useReducer } from "react";

import boardContext from "./board-context";
import { TOOL_ITEMS } from "../constants";

// useReducer ->
const boardReducer = (state, action) => {
  // ab yaha mei switch mei harr type ke liye uska particular action define kar lunga
  switch (action.type) {
    // change_tool action pe sabkuch same rakha and return the new state with changing the activetoolitem
    case "CHANGE_TOOL":
      return {
        // return the new state with changed value
        ...state,
        activeToolItem: action.payload.tool, // new value se update kar de
      };

    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  elements: [],
};

// children prop always chaiye hoga provider mei
const BoardProvider = ({ children }) => {
  // takes a reducer function and an initial state, returning the current state and a dispatch function.
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  // now instead of making both these state i will handle them with useReducer
  // const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);
  // const [elements, setElements] = useState([]);

  const handleToolItemClick = (tool) => {
    // setActiveToolItem(tool); // now instead of directly changing this we have to dipatch an action

    dispatchBoardAction({
      type: "CHANGE_TOOL",
      payload: { tool },
    });
  };

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
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
