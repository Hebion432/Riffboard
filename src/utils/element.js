// this will return the rough element based on the tool item type

import { SiCnet } from "react-icons/si";
import { TOOL_ITEMS } from "../constants";
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

    default:
      throw new Error("Tool type not Recognised");
  }
};
