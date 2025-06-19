import React, { useContext } from "react";

import cx from "classnames";
import classes from "./index.module.css";
import {
  COLORS,
  FILL_TOOL_TYPES,
  STROKE_TOOL_TYPES,
  SIZE_TOOL_TYPES,
} from "../../constants";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/toolbox-context";

const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext); // yaha se mai current tool nikalunga
  const { toolboxState, changeStroke, changeFill, changeSize } =
    useContext(toolboxContext); // yaha se we will take out the initial state of tool.

  const strokeColor = toolboxState[activeToolItem]?.stroke; // out current tool ke toolboxstate mei se get it's color
  const fillColor = toolboxState[activeToolItem]?.fill; // get the fill color
  const size = toolboxState[activeToolItem]?.size; // get size

  return (
    <div className={classes.container}>
      {/* this was for stroke Color and only give stroke option agar current tool stroke tool type (in constant.js ) mei define hai tabhi */}

      {STROKE_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Stroke Color</div>
          <div className={classes.colorsContainer}>
            {/* here we want to map on all the colors but it's an object so we will map on it's keys */}
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: strokeColor === COLORS[k],
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => changeStroke(activeToolItem, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}

      {/* this is for fill color and only give stroke option agar current tool fill tool type (in constant.js ) mei define hai tabhi */}
      {FILL_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          <div className={classes.colorsContainer}>
            {/* here we want to map on all the colors but it's an object so we will map on it's keys */}
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: fillColor === COLORS[k],
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => changeFill(activeToolItem, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}

      {/* this is for size and only give size option agar current tool SIZE_TOOL_TYPE (in constant.js ) mei define hai tabhi */}
      {SIZE_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Brush Size</div>
          <input
            type="range"
            min={1} //size of brush
            max={9}
            step={1}
            value={size}
            onChange={(event) => changeSize(activeToolItem, event.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Toolbox;
