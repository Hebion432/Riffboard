import React, { useContext, useState } from "react";

import classes from "./index.module.css";

import cx from "classnames"; // to conditionally give class names

import { FaSlash } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import boardContext from "../../store/board-context";

function Toolbar() {
  const { activeToolItem, changeToolHandler } = useContext(boardContext); // now ye dono boardContext mei define hone chaiye and in function ka implementaion BoardProvider.js mei hone chaiye and pass them in value field then jaha bhi mujhe use karna hai wrap it's component (e.g toolbar ) in BoardProvider and use these function inside that component

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "LINE", // here if activeToolitem is A then only add active class
        })}
        onClick={() => changeToolHandler("LINE")}
      >
        <FaSlash />
      </div>

      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "RECTANGLE",
        })}
        onClick={() => changeToolHandler("RECTANGLE")}
      >
        <LuRectangleHorizontal />
      </div>
    </div>
  );
}

export default Toolbar;
