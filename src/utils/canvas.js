export function drawRect(context, coords, fillColor, lineWidth, strokeColor) {
    let [left, top, right, bot] = coords;
    context.fillStyle = fillColor;
    context.lineWidth = lineWidth;
    context.strokeColor = strokeColor;
    context.strokeRect(left, top, right - left, bot - top);
    context.fillRect(left, top, right - left, bot - top);
}

export function drawCircle(context, coords, fillColor) {
    const [centerX, centerY, radius] = coords;
    context.fillStyle = fillColor;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fill();
}

export function drawText(context, coords, text, font, textAlign, fillColor) {
    const [x,y] = coords;
    context.font = font;
    context.textAlign = textAlign;
    context.fillStyle = fillColor;
    context.fillText(text, x, y);
}

export function getArrowPoints(coords) {
    const [botX, botY, topX, topY] = coords;
    const totalHeight = Math.sqrt((topY - botY) ** 2 + (topX - botX) ** 2);
    const bodyHeight = 0.6 * totalHeight;
    const bodyWidth = 0.3 * totalHeight;
    const arrowHeight = 0.4 * totalHeight;
    const arrowWidth = 1.2 * totalHeight;

    const arrowLength = Math.sqrt((arrowWidth / 2) ** 2 + arrowHeight ** 2);
    const arrowInnerLength = Math.sqrt((bodyWidth / 2) ** 2 + arrowHeight ** 2);
    const angle = Math.atan2(topY-botY, topX-botX);
    const outerAngle = Math.PI/4;
    const innerAngle = Math.atan2(bodyWidth/2, arrowHeight);
    const angle90 = Math.PI/2;

    const mid1X = topX - arrowLength * Math.cos(angle - outerAngle);
    const mid1Y = topY - arrowLength * Math.sin(angle - outerAngle);
    const mid2X = topX - arrowInnerLength * Math.cos(angle - innerAngle);
    const mid2Y = topY - arrowInnerLength * Math.sin(angle - innerAngle);
    const mid3X = topX - arrowInnerLength * Math.cos(angle + innerAngle);
    const mid3Y = topY - arrowInnerLength * Math.sin(angle + innerAngle);
    const mid4X = topX - arrowLength * Math.cos(angle + outerAngle);
    const mid4Y = topY - arrowLength * Math.sin(angle + outerAngle);

    const bot1X = botX - bodyWidth * Math.cos(angle - angle90);
    const bot1Y = botY - bodyWidth * Math.sin(angle - angle90);
    const bot2X = botX - bodyWidth * Math.cos(angle + angle90);
    const bot2Y = botY - bodyWidth * Math.sin(angle + angle90);

    return [topX, topY, mid1X, mid1Y, mid2X, mid2Y, bot1X, bot1Y, bot2X, bot2Y, mid3X, mid3Y, mid4X, mid4Y];
}

export function drawArrow(context, coords, fillColor) {
    //                  |\
    //          --------  \
    //                     \
    //                     /
    //          --------  /
    //                  |/
    let arrowCoords = coords;
    if (coords.length === 4) {
        arrowCoords = getArrowPoints(coords);
    }
    let [topX, topY, mid1X, mid1Y, mid2X, mid2Y, bot1X, bot1Y, bot2X, bot2Y, mid3X, mid3Y, mid4X, mid4Y] = arrowCoords;

    context.fillStyle = fillColor;
    context.beginPath();
    context.moveTo(topX, topY);
    context.lineTo(mid1X, mid1Y);
    context.lineTo(mid2X, mid2Y);
    context.lineTo(bot1X, bot1Y);
    context.lineTo(bot2X, bot2Y);
    context.lineTo(mid3X, mid3Y);
    context.lineTo(mid4X, mid4Y);
    context.closePath();
    // context.stroke();
    context.fill();
}

// const midSlope = (topY - botY) / (topX - botX);
// const midYInt = botY - midSlope * botX;
// const botSlope = -1 * midSlope;
// const botYInt = botY - botSlope * botX;
// const bot1X = 
// // const bot1X = (sqrt((-1 * (botX ** 2) * (botSlope ** 2)) + 
// //                     (2 * botX * botY * botSlope) - 
// //                     (2 * botX * botSlope * botYInt) - 
// //                     (botY ** 2) + 
// //                     (2 * botY * botYInt) + 
// //                     ((botSlope ** 2) * ((bodyWidth / 2) ** 2)) +
// //                     ((bodyWidth / 2) ** 2) - 
// //                     (botYInt ** 2)
// //                    ) +
// //                 (botX + botY * botSlope - botSlope * botYInt)
// //               ) / (botSlope ** 2 + 1);
// const bot1Y = botSlope * bot1X + botYInt;
// const bot2X = -1 * bot1X;
// const bot2Y = botSlope * bot2X + botYInt;
// const 