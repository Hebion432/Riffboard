import React, { useReducer } from "react";

import boardContext from "./board-context";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constants";
import {
  createRoughtElement,
  getSvgPathFromStroke,
  isPointNearElement,
} from "../utils/element";
import getStroke from "perfect-freehand";

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
      const { clientX, clientY, stroke, fill, size } = action.payload;

      //new coordinates se ek new item bana ke push in elements array ( made a particular function for it to make element base on tool_item type)
      const newElement = createRoughtElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem, stroke, fill, size }
      );

      // yaha mai new elment ko previouse elments ke saath elements array mei daal dunga

      // if current tool is eraser then change the state to ERASING
      const prevElements = state.elements;
      return {
        ...state,
        toolActionType:
          state.activeToolItem === TOOL_ITEMS.ERASER
            ? TOOL_ACTION_TYPES.ERASING
            : TOOL_ACTION_TYPES.DRAWING, // so that now when the button is clicked i can keep tract of onMouseMove
        elements: [...prevElements, newElement],
      };
    }
    // for mouse move
    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;

      const updatedElements = [...state.elements]; // get all the elements

      const index = updatedElements.length - 1; // get the last index

      // abb kyuki maine mouse down pe stroke and fill le liye that from toolbox context by passing through a handler , and i wanted that while i was moving my cursor so instead of passing it again i will keep those value while i am creating the element so that i can get those values from element only
      const { type } = updatedElements[index]; // isme type bhi lele to make different elements based on tool

      switch (type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          const { x1, y1, stroke, fill, size } = updatedElements[index]; // isme type bhi lele to make different elements based on tool
          // ye mere paas new Element bann ke aa gaya with the update co-ordinates in all the above 4 types of tools
          const newElement = createRoughtElement(
            index,
            x1,
            y1,
            clientX,
            clientY,
            {
              type: state.activeToolItem,
              stroke,
              fill,
              size,
            }
          );

          updatedElements[index] = newElement;

          return {
            ...state,
            elements: updatedElements,
          };

        case TOOL_ITEMS.BRUSH:
          // brush ke case mei we will push all the points in the POINTS array of the element.
          // yaha points as well as path dono update kar de
          updatedElements[index].points = [
            ...updatedElements[index].points,
            { x: clientX, y: clientY },
          ];
          updatedElements[index].path = new Path2D(
            getSvgPathFromStroke(getStroke(updatedElements[index].points))
          );

          return {
            ...state,
            elements: updatedElements,
          };

        default:
          return state;
      }
    }

    // for mouse up to stop updating the co-ordinated of (x2, y2) so just chnage the toolactiontype back to none again
    case BOARD_ACTIONS.DRAW_UP: {
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
      };
    }

    //eraser case handle
    case BOARD_ACTIONS.ERASE: {
      const { clientX, clientY } = action.payload;

      let newElements = [...state.elements];

      newElements = newElements.filter((element) => {
        // define in element.js
        return !isPointNearElement(element, clientX, clientY); // agar wo hamare eraser ke point ke paas hai then we have to delete it
      });

      return {
        ...state,
        element: newElements,
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
  const boardMouseDownHandler = (event, toolboxState) => {
    const { clientX, clientY } = event;

    //toolboxState -> so that we can get the stroke, fill property of the tool

    // isko dispatchaction se handle karke iss coordinate ka ek rough object bana ke usko elements array mei push kar de

    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
        stroke: toolboxState[boardState.activeToolItem]?.stroke,
        fill: toolboxState[boardState.activeToolItem]?.fill,
        size: toolboxState[boardState.activeToolItem]?.size,
      },
    });
  };

  // handler for jab mouser cursor ko move kareenge fro real time position of cursor
  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;

    if (boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
      // isko dispatchaction se handle karke iss coordinate ka ek rough object bana ke usko elements array mei push kar de
      dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_MOVE,
        payload: {
          clientX,
          clientY,
        },
      });
    } else if (boardState.toolActionType === TOOL_ACTION_TYPES.ERASING) {
      // for erase we will dispatch different action and handle it in reducer
      dispatchBoardAction({
        type: BOARD_ACTIONS.ERASE,
        payload: {
          clientX,
          clientY,
        },
      });
    }
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
