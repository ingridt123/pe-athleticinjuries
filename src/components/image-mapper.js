import React, { useRef } from 'react'
import { Link } from 'gatsby'

import styles from "./image-mapper.module.css"

export default function ImageMapper(props) {

    var newWidth = props.orgWidth;
    var newHeight = props.orgHeight;
    if (props.height) {
        newWidth = props.orgWidth * (props.height / props.orgHeight);
        newHeight = props.height;
    }
    if (typeof window !== `undefined`) {
        if (newWidth > window.width) {
            newWidth = window.width;
            newHeight = props.orgHeight * (window.width / props.orgWidth);
        }
    }

    const canvasRef = useRef(null);
    let context;

    // Source: https://github.com/coldiary/react-image-mapper/blob/master/src/ImageMapper.js
    function hoverOn(coords) {
        context = canvasRef.current.getContext('2d');

        let fillColor = props.fillColor || "rgba(255, 255, 255, 0.5)";
        let lineWidth = props.lineWidth || 1;
        let strokeColor = props.strokeColor || "rgba(0, 0, 0, 0.5)";
        let [left, top, right, bot] = coords;

        context.fillStyle = fillColor;
        context.lineWidth = lineWidth;
        context.strokeColor = strokeColor;
        context.strokeRect(left, top, right - left, bot - top);
        context.fillRect(left, top, right - left, bot - top);
    }

    function hoverOff() {
        context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    // useEffect(() => {
    //     // context = canvasRef.current.getContext('2d');
    // }, [])

    return (
        <div className={styles.container}>
            <img src={props.src} 
                 useMap={'#' + props.name}
                 style={{width: newWidth, height: newHeight}}
                 alt={props.name} 
                 className={styles.imageMap}
            />
            <canvas ref={canvasRef}
                    width={newWidth} height={newHeight}
                    className={styles.canvas}
            />
            <map name={props.name}>
                {props.map.areas.map( (a, index) => {
                    for (let i = 0; i < a.coords.length; i++) {
                        a.coords[i] *= (newHeight / props.orgHeight);
                    }
                    return <Link to={a.href}>
                                <area alt={a.name} title={a.name}
                                // key={index}
                                 coords={a.coords} shape={a.shape}
                                 onMouseEnter={hoverOn.bind(this, a.coords)}
                                 onMouseLeave={hoverOff.bind(this)} />
                            </Link>
                })}
            </map>
        </div>
    );
}