import { useContext, useEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES } from "../../constants";

function Board() {
  const canvasRef = useRef();

  // and now i will take elements array from context
  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    toolActionType,
  } = useContext(boardContext);

  // this use effect will simply set the height and width of the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  // sare elements ko draw karne ke liye we will make another useEffect
  // every time elements array chnage we will clean the board first and then rerender and draw each item in elements again
  useEffect(() => {
    const canvas = canvasRef.current;

    // so that we can clear it in useEffect before rerendring the new items in elements array
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);

    // and now jab elements change honge i will draw the items of element array
    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);
    });

    return () => {
      // jab bhi elements change ho, clear kar de pure canvas ko and then rerender them again
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  // jaise hi mouse click hoga
  const handleMouseDown = (event) => {
    boardMouseDownHandler(event); // isme se bascially i will get the co-ordinates ( clientX, clientY)
  };

  // continuously fires as the mouse cursor moves, providing real-time updates on the cursor’s position.
  const handleMouseMove = (event) => {
    if (toolActionType === TOOL_ACTION_TYPES.DRAWING) {
      boardMouseMoveHandler(event); // isme se bascially i will get the co-ordinates ( clientX, clientY)
    } // agar abhi tak button click hi nahi hua hai then don't keep track of the cursor movement
  };

  // when we relaese the mouse cursor
  const handleMouseUp = () => {
    boardMouseUpHandler();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

export default Board;
