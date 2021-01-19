import React, { useRef, useEffect } from 'react'
import { Link } from 'gatsby'

import styles from "./image-mapper.module.css"
import { drawRect, drawArrow } from "../utils/canvas"

export default function ImageMapper({ orgWidth, orgHeight, height, src, name, map, 
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
        canvas.width = newWidth;
        canvas.height = newHeight;
        // context.scale(2, 2);
    }, []);

    // Adapted from https://github.com/coldiary/react-image-mapper/blob/master/src/ImageMapper.js
    function hoverOn(coords, shape, fillColor="rgba(255, 255, 255, 0.5)") {
        console.log("hover on", shape);
        switch (shape) {
            case "rect":
                drawRect(context, coords, fillColor, lineWidth, strokeColor);
                break;
            case "poly":
                drawArrow(context, coords, fillColor);
                break;
        }
    }

    function hoverOff() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
    
    return (
        <div className={home ? styles.container : ""}>
            {src ? 
            <img src={src} 
                 useMap={'#' + name}
                 style={{width: newWidth, height: newHeight}}
                 alt={name} 
                 className={styles.imageMap}
            /> :
            <></>}
            <canvas ref={canvasRef}
                    className={styles.canvas}
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
                                      onMouseEnter={hoverOn.bind(this, a.coords, a.shape, a.fillColor)}
                                      onMouseLeave={hoverOff.bind(this)} />
                                </Link>
                    }
                    return <area alt={a.name} title={a.name}
                                 // key={index}
                                 coords={a.coords} shape={a.shape}
                                 onMouseEnter={hoverOn.bind(this, a.coords, a.shape, a.fillColor)}
                                 onMouseLeave={hoverOff.bind(this)} />
                })}
            </map>
        </div>
    );
}