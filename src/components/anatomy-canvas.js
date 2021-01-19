import React, { useRef, useEffect, useState } from 'react'

import styles from "./anatomy-canvas.module.css"
import { drawArrow, drawText, drawCircle } from '../utils/canvas';

export default function AnatomyCanvas({ width, height, arrows, circles, textFont }) {

    const canvasRef = useRef(null);
    const [term, setTerm] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        context.scale(2, 2);
        context.font = "12px " + textFont.bodyFontFamily[0];
        
        for (let i = 0; i < arrows.length; i++) {
            context.save();
            context.globalAlpha = 0.7;
            drawArrow(context, arrows[i].coords, arrows[i].fillColor);
            context.restore();
            if (arrows[i].text) {
                drawText(context, arrows[i].textCoords, arrows[i].text, arrows[i].textAlign, arrows[i].fillColor);
            }
        }
        for (let i = 0; i < circles.length; i++) {
            context.globalAlpha = 0.7;
            drawCircle(context, circles[i].coords, circles[i].fillColor);
        }
    }, []);

    function hoverOn(newTerm) {
        setTerm(newTerm);
    }

    function hoverOff() {
        setTerm(null);
    }

    return <canvas id={styles.anatomyCanvas} ref={canvasRef} />;
}