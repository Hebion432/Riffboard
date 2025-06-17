import React, { useReducer } from "react";

import boardContext from "./board-context";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constants";
import { createRoughtElement } from "../utils/element";

// useReducer ->
const boardReducer = (state, action) => {
  // ab yaha mei switch mei harr type ke liye uska particular action define kar lunga
  switch (action.type) {
    // change_tool action pe sabkuch same rakha and return the new state with changing the activetoolitem
    case BOARD_ACTIONS.CHANGE_TOOL: {
      return {
        // return the new state with changed value
        ...state,
        activeToolItem: action.payload.tool, // new value se update kar de
      };
    }

    // to add new item object in the elment array with the coordinate of the clientX, clientY
    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY } = action.payload;

      //new coordinates se ek new item bana ke push in elements array ( made a particular function for it to make element base on tool_item type)
      const newElement = createRoughtElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem }
      );

      // yaha mai new elment ko previouse elments ke saath elements array mei daal dunga
      const prevElements = state.elements;
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.DRAWING, // so that now when the button is clicked i can keep tract of onMouseMove
        elements: [...prevElements, newElement],
      };
    }
    // for mouse move
    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;

      const updatedElements = [...state.elements]; // get all the elements

      const index = updatedElements.length - 1; // get the last index

      // ye mere paas new Element bann ke aa gaya with the update co-ordinates
      const newElement = createRoughtElement(
        index,
        updatedElements[index].x1,
        updatedElements[index].y1,
        clientX,
        clientY,
        { type: state.activeToolItem }
      );

      updatedElements[index] = newElement;

      return {
        ...state,
        elements: updatedElements,
      };
    }

    // for mouse up to stop updating the co-ordinated of (x2, y2) so just chnage the toolactiontype back to none again
    case BOARD_ACTIONS.DRAW_UP: {
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
      };
    }

    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  elements: [],
  toolActionType: TOOL_ACTION_TYPES.NONE,
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

  const changeToolHandler = (tool) => {
    // setActiveToolItem(tool); // now instead of directly changing this we have to dipatch an action

    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_TOOL,
      payload: { tool },
    });
  };

  // handler for jab mouse click hoga
  const boardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;

    // isko dispatchaction se handle karke iss coordinate ka ek rough object bana ke usko elements array mei push kar de

    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  // handler for jab mouser cursor ko move kareenge fro real time position of cursor
  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;

    // isko dispatchaction se handle karke iss coordinate ka ek rough object bana ke usko elements array mei push kar de

    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_MOVE,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  // the moment i leave the mouse cursor it should stop updating
  const boardMouseUpHandler = () => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_UP,
    });
  };

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
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
