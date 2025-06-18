// this will return the rough element based on the tool item type

import { ARROW_LENGTH, TOOL_ITEMS } from "../constants";
import { getArrowHeadsCoordinates } from "./math";
import rough from "roughjs/bin/rough"; // to import gen
//import rough generator so that yahi se direct rough ka element create kar de based on the parameter it take ( different parameter for each type of tool (line , rectangle ))
const gen = rough.generator();

export const createRoughtElement = (id, x1, y1, x2, y2, { type }) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
  };

  // here we can give options
  let options = {
    seed: id + 1, // here id can never be zero
  };

  switch (type) {
    case TOOL_ITEMS.LINE: {
      element.roughEle = gen.line(x1, y1, x2, y2, options);
      return element;
    }

    case TOOL_ITEMS.RECTANGLE: {
      element.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options); // kyuki isme width, height dena hai
      return element;
    }

    //case for circle
    case TOOL_ITEMS.CIRCLE: {
      const center_x = (x1 + x2) / 2,
        center_y = (y1 + y2) / 2;
      const width = x2 - x1,
        height = y2 - y1;
      element.roughEle = gen.ellipse(
        center_x,
        center_y,
        width,
        height,
        options
      ); // kyuki isme width, height dena hai
      return element;
    }

    // case for arrow
    case TOOL_ITEMS.ARROW: {
      const { x3, y3, x4, y4 } = getArrowHeadsCoordinates(
        x1,
        y1,
        x2,
        y2,
        ARROW_LENGTH
      );

      // TO generate the arrows we have to assign an array of co-ordinates of how we will move
      //So to make points pehle ham (x1, y1 ) se (x2, y2 ) tak then (x2, y2) se (x3, y3) tak and then back to (x2, y2) and then from there (x4, y4)
      const points = [
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x2, y2],
        [x4, y4],
      ];
      element.roughEle = gen.linearPath(points, options);
      return element;
    }

    default:
      throw new Error("Tool type not Recognised");
  }
};
