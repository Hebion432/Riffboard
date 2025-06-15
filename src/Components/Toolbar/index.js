import React, { useState } from "react";

import classes from "./index.module.css";

import cx from "classnames"; // to conditionally give class names

function Toolbar() {
  const [activeToolItem, setActiveToolItem] = useState("A");

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "A", // here if activeToolitem is A then only add active class
        })}
        onClick={() => setActiveToolItem("A")}
      >
        A
      </div>

      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "B",
        })}
        onClick={() => setActiveToolItem("B")}
      >
        B
      </div>
    </div>
  );
}

export default Toolbar;
