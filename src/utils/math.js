export const getArrowHeadsCoordinates = (x1, y1, x2, y2, arrowLength) => {
  // get the slope
  const angle = Math.atan2(y2 - y1, x2 - x1);

  //get points of both arrow as we want at 30degree decline so the co-ordinates are (x2 - len*cosTheta), (y2 - len*sinTheta)
  const x3 = x2 - arrowLength * Math.cos(angle - Math.PI / 6);
  const y3 = y2 - arrowLength * Math.sin(angle - Math.PI / 6);

  const x4 = x2 - arrowLength * Math.cos(angle + Math.PI / 6);
  const y4 = y2 - arrowLength * Math.sin(angle + Math.PI / 6);

  return { x3, y3, x4, y4 };
};
