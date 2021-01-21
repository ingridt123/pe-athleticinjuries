import React, { useState } from 'react'

import Layout from '../components/layout'
import ExercisesSection from '../components/exercises-section'
import ImageMapper from '../components/image-mapper'
import AnatomyCanvas from '../components/anatomy-canvas'
import AnatomyText from '../components/anatomy-text'
import musculoskeletal from "../images/musculoskeletal.png"
import blank from "../images/blank.png"
import { getArrowPoints } from "../utils/canvas"
import { options } from "../utils/typography"
import styles from "./terminology.module.css"

export default function Terminology({ data }) {

    const [anatomyText, setAnatomyText] = useState([{
        title: "Hover over the terms on the diagram to learn more!",
        description: ""
    }]);

    const ANATOMY_ARROWS = [
        {
            coords: [150, 40, 150, 0], fillColor: "#0558ff", 
            textCoords: [150, 57], textAlign: "center", text: "Superior / Cranial",
            areaCoords: [85, 0, 215, 68]
        },
        {
            coords: [150, 460, 150, 500], fillColor: "#0558ff", 
            textCoords: [150, 450], textAlign: "center", text: "Inferior / Caudal",
            areaCoords: [85, 430, 216, 500]
        },
        {
            coords: [105, 200, 145, 200], fillColor: "#58ff05", 
            textCoords: [90, 205], textAlign: "end", text: "Medial",
            areaCoords: [196, 222, 28, 174]
        },
        {
            coords: [195, 200, 155, 200], fillColor: "#58ff05",
            textCoords: [90, 205], textAlign: "end", text: "Medial",
            areaCoords: [196, 222, 28, 174]
        },
        {
            coords: [145, 260, 105, 260], fillColor: "#ffac05",
            textCoords: [110, 285], textAlign: "end", text: "Lateral",
            areaCoords: [196, 287, 28, 236]
        },
        {
            coords: [155, 260, 195, 260], fillColor: "#ffac05",
            textCoords: [110, 285], textAlign: "end", text: "Lateral",
            areaCoords: [196, 287, 28, 236]
        },
        {
            coords: [230, 168, 218, 130], fillColor: "#ac05ff",
            textCoords: [200, 120], textAlign: "start", text: "Proximal",
            areaCoords: [198, 101, 282, 238]
        },
        {
            coords: [233, 175, 245, 213], fillColor: "#ac05ff",
            textCoords: [240, 230], textAlign: "start", text: "Distal",
            areaCoords: [198, 101, 282, 238]
        },
        {
            coords: [0,0,0,0], fillColor: "#a52a2a",
            textCoords: [70, 90], textAlign: "center", text: "Anterior",
            areaCoords: [12, 81, 94, 158]
        },
        {
            coords: [0,0,0,0], fillColor: "#a52a2a",
            textCoords: [70, 110], textAlign: "center", text: "Posterior",
            areaCoords: [12, 81, 94, 158]
        },
        {
            coords: [90, 360, 110, 350], fillColor: "#ff0558",
            textCoords: [110, 380], textAlign: "end", text: "Ipsilateral",
            areaCoords: [31, 309, 278, 398]
        },
        {
            coords: [210, 360, 190, 350], fillColor: "#ff0558",
            textCoords: [190, 380], textAlign: "start", text: "Contralateral",
            areaCoords: [31, 309, 278, 398]
        },
    ]

    const ANATOMY_CIRCLES = [
        {coords: [133, 330, 10], fillColor: "#ff0558"},
    ]
    let anatomy_mapAreas = [];
    for (let i = 0; i < ANATOMY_ARROWS.length; i++) {
        const arrow1 = ANATOMY_ARROWS[i];
        const arrow2 = ANATOMY_ARROWS[i % 2 === 0 ? i+1 : i-1];
        let circlesList = [];
        if (i >= ANATOMY_ARROWS.length-2) {
            circlesList.push({coords: ANATOMY_CIRCLES[0].coords});
        }
        anatomy_mapAreas.push({
            name: arrow1.text,
            shape: "rect",
            coords: arrow1.areaCoords,
            altCoords: {
                arrows: [
                    {coords: getArrowPoints(arrow1.coords)},
                    {coords: getArrowPoints(arrow2.coords)},
                ],
                text: [
                    {
                        coords: arrow1.textCoords, textAlign: arrow1.textAlign, text: arrow1.text, 
                        textFont: "12px " + options.bodyFontFamily[0],
                    },
                    {
                        coords: arrow2.textCoords, textAlign: arrow2.textAlign, text: arrow2.text, 
                        textFont: "12px " + options.bodyFontFamily[0],
                    },
                ],
                circles: circlesList,
            },
            fillColor: arrow1.fillColor,
            href: "",
        });
    }

    const ANATOMY_MAP = {
        name: "anatomy-map",
        areas: anatomy_mapAreas,
        
    }

    function updateAnatomyText(areaTitle) {
        for (let i = 0; i < data.allDirectionTerm.nodes.length; i++) {
            const term = data.allDirectionTerm.nodes[i];
            if (term.titles.includes(areaTitle)) {
                setAnatomyText(term.data);
                return;
            }
        }
        setAnatomyText([]);
    }

    return (
        <Layout>
            <div>
                <h2>Terms of Position and Direction</h2>
                <p className={styles.description}>All of these terms are related to the standard anatomical position, in which the body stands erect, the limbs are extended, and the palms of the hand face forward.</p>
                <div className={styles.container}>
                    <div className={styles.anatomyContainer}>
                        <img id={styles.anatomyImg} src={musculoskeletal} alt="Anatomy Terms" />
                        <AnatomyCanvas width={600} height={1000}
                                    arrows={ANATOMY_ARROWS} circles={ANATOMY_CIRCLES}
                                    textFont={options} />
                        <img id={styles.blankImg} src={blank} alt="Blank" useMap="#anatomy-map"/>
                        <ImageMapper src={blank} map={ANATOMY_MAP} name="anatomy-map"
                                     hoverAction={updateAnatomyText}
                                     lineWidth={0} orgWidth={300} orgHeight={500} />
                    </div>
                    <AnatomyText text={anatomyText} />
                </div>
            </div>
            <ExercisesSection headerText="Terms of Movement" exercises={data.allMovementTerm.nodes} />
        </Layout>
    );
}

export const query = graphql`
    query {
        allMovementTerm {
            nodes {
              title
              gifUrl
              stillUrl
              description
            }
        }
        allDirectionTerm {
            nodes {
                titles
                data {
                    title
                    description
                }
            }
        }
    }
`
