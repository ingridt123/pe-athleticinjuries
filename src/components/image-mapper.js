import React, { useRef, useEffect } from 'react'
import { Link } from 'gatsby'

import styles from "./image-mapper.module.css"
import { drawRect, drawArrow, drawText, drawCircle } from "../utils/canvas"

export default function ImageMapper({ orgWidth, orgHeight, height, src, name, map, hoverAction,
                                      home=false, lineWidth=1, strokeColor="rgba(0, 0, 0, 0.5)"}) {

    var newWidth = orgWidth;
    var newHeight = orgHeight;
    if (height) {
        newWidth = orgWidth * (height / orgHeight);
        newHeight = height;
    }
    if (typeof window !== `undefined`) {
        if (newWidth > window.width) {
            newWidth = window.width;
            newHeight = orgHeight * (window.width / orgWidth);
        }
    }

    const canvasRef = useRef(null);
    let canvas;
    let context;

    useEffect(() => {
        canvas = canvasRef.current;
        context = canvas.getContext('2d');
        canvas.width = newWidth * 2;
        canvas.height = newHeight * 2;
        context.scale(2, 2);
    }, [context]);

    // Adapted from https://github.com/coldiary/react-image-mapper/blob/master/src/ImageMapper.js
    function hoverOn(name, coords, altCoords, shape, fillColor="rgba(255, 255, 255, 0.5)") {
        console.log("hover on", shape, name);
        context = canvasRef.current.getContext('2d');
        if (!altCoords) {
            switch (shape) {
                case "rect":
                    drawRect(context, coords, fillColor, lineWidth, strokeColor);
                    break;
                case "poly":
                    drawArrow(context, coords, fillColor);
                    break;
            }
        } else {
            for (let i = 0; i < altCoords.arrows.length; i++) {
                const arrow = altCoords.arrows[i];
                drawArrow(context, arrow.coords, fillColor);
            }
            for (let i = 0; i < altCoords.text.length; i++) {
                const text = altCoords.text[i];
                drawText(context, text.coords, text.text, text.textFont, text.textAlign, fillColor);
            }
            for (let i = 0; i < altCoords.circles.length; i++) {
                const circle = altCoords.circles[i];
                drawCircle(context, circle.coords, fillColor);
            }
        }

        if (hoverAction) {
            hoverAction(name);
        }
    }

    function hoverOff() {
        context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
    
    return (
        <div className={home ? styles.containerHome : styles.containerOverlay}>
            {src ? 
            <img src={src} 
                 useMap={'#' + name}
                 style={{width: newWidth, height: newHeight}}
                 alt={name} 
                 className={styles.imageMap}
            /> :
            <></>}
            <canvas ref={canvasRef}
                    className={styles.canvas} style={{width: newWidth, height: newHeight}}
            />
            <map name={name}>
                {map.areas.map((a) => {
                    for (let i = 0; i < a.coords.length; i++) {
                        a.coords[i] *= (newHeight / orgHeight);
                    }
                    if (a.href) {
                        return <Link to={a.href}>
                                <area alt={a.name} title={a.name}
                                      // key={index}
                                      coords={a.coords} shape={a.shape}
                                      onMouseEnter={hoverOn.bind(this, a.name, a.coords, a.altCoords, a.shape, a.fillColor)}
                                      onMouseLeave={hoverOff.bind(this)} />
                                </Link>
                    }
                    return <area alt={a.name} title={a.name}
                                 // key={index}
                                 coords={a.coords} shape={a.shape}
                                 onMouseEnter={hoverOn.bind(this, a.name, a.coords, a.altCoords, a.shape, a.fillColor)}
                                 onMouseLeave={hoverOff.bind(this)} />
                })}
            </map>
        </div>
    );
}