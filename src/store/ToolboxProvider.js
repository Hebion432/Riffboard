import React, { useReducer } from "react";
import toolboxContext from "./toolbox-context";
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTION } from "../constants";

//Toolbox reducer
function toolboxReducer(state, action) {
  switch (action.type) {
    case TOOLBOX_ACTION.CHANGE_STROKE: {
      // uss tool pe ja jiska stroke change karna tha and change it's stroke
      const newState = { ...state };
      newState[action.payload.tool].stroke = action.payload.stroke;
      return newState;
      // return {
      //   ...state,
      //   [action.payload.tool]: {
      //     ...action.payload.tool,
      //     stoke: action.payload.stroke,
      //   },
      // };
    }

    case TOOLBOX_ACTION.CHANGE_FILL: {
      const newState = { ...state };
      newState[action.payload.tool].fill = action.payload.fill;
      return newState;
    }

    case TOOLBOX_ACTION.CHANGE_SIZE: {
      const newState = { ...state };
      newState[action.payload.tool].size = action.payload.size;
      return newState;
    }

    default:
      return state;
  }
}

const initialToolboxState = {
  // abb isme har tool ka initial state set kar de

  [TOOL_ITEMS.LINE]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROW]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
};

const ToolBoxProvider = ({ children }) => {
  // now here we will make a state that will link to each tool ( stroke, color, filll, size )

  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState
  );

  const changeStrokeHandler = (tool, stroke) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTION.CHANGE_STROKE,
      payload: {
        tool,
        stroke,
      },
    });
  };

  const changeFillHandler = (tool, fill) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTION.CHANGE_FILL,
      payload: {
        tool,
        fill,
      },
    });
  };

  const changeSizeHandler = (tool, size) => {
    // we will get the new size in here -> update it
    dispatchToolboxAction({
      type: TOOLBOX_ACTION.CHANGE_SIZE,
      payload: {
        tool,
        size,
      },
    });
  };

  const toolboxContextValue = {
    toolboxState,
    changeStroke: changeStrokeHandler,
    changeFill: changeFillHandler,
    changeSize: changeSizeHandler,
  };
  return (
    <toolboxContext.Provider value={toolboxContextValue}>
      {children}
    </toolboxContext.Provider>
  );
};

export default ToolBoxProvider;
