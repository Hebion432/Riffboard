import { useEffect, useRef } from "react";
import rough from "roughjs";

function Board() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const roughCanvas = rough.canvas(canvas);
    const generator = roughCanvas.generator;

    let rect1 = generator.rectangle(10, 10, 100, 100);
    let rect2 = generator.rectangle(10, 120, 100, 100, {
      fill: "red",
      stroke: "blue",
    });
    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);
  }, []);

  const handleBoardMouseDown = (event) => {
    // yaha se mujhe ye pata chal jaayega maine click kaha kiya tha
    const clientX = event.clientX;
    const clientY = event.clientY;

    // ab yaha se mai elements mei inn points ko push karke i will draw them using the help of rough.js

    console.log(clientX, clientY);
  };

  return <canvas ref={canvasRef} onMouseDown={handleBoardMouseDown} />;
}

export default Board;
