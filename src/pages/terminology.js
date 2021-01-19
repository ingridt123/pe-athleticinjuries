import React, { useRef, useEffect } from 'react'

import Layout from '../components/layout'
import ExercisesSection from '../components/exercises-section'
import ImageMapper from '../components/image-mapper'
import AnatomyCanvas from '../components/anatomy-canvas'
import AnatomyText from '../components/anatomy-text'
import musculoskeletal from "../images/musculoskeletal.png"
import { getArrowPoints } from "../utils/canvas"
import { options } from "../utils/typography"
import styles from "./terminology.module.css"

export default function Terminology({ data }) {

    const ANATOMY_ARROWS = [
        {
            coords: [150, 40, 150, 0], fillColor: "#0558ff", 
            textCoords: [150, 57], textAlign: "center", text: "Superior / Cranial"
        },
        {
            coords: [150, 460, 150, 500], fillColor: "#0558ff", 
            textCoords: [150, 450], textAlign: "center", text: "Inferior / Caudal"
        },
        {
            coords: [105, 200, 145, 200], fillColor: "#58ff05", 
            textCoords: [90, 205], textAlign: "end", text: "Medial"
        },
        {
            coords: [195, 200, 155, 200], fillColor: "#58ff05",
            textCoords: [90, 205], textAlign: "end", text: "Medial"
        },
        {
            coords: [145, 260, 105, 260], fillColor: "#ffac05",
            textCoords: [110, 285], textAlign: "end", text: "Lateral"
        },
        {
            coords: [155, 260, 195, 260], fillColor: "#ffac05",
            textCoords: [110, 285], textAlign: "end", text: "Lateral"
        },
        {
            coords: [230, 168, 218, 130], fillColor: "#ac05ff",
            textCoords: [200, 120], textAlign: "start", text: "Proximal"
        },
        {
            coords: [233, 175, 245, 213], fillColor: "#ac05ff",
            textCoords: [240, 230], textAlign: "start", text: "Distal"
        },
        {
            coords: [90, 360, 110, 350], fillColor: "#ff0558",
            textCoords: [110, 380], textAlign: "end", text: "Ipsilateral"
        },
        {
            coords: [210, 360, 190, 350], fillColor: "#ff0558",
            textCoords: [190, 380], textAlign: "start", text: "Contralateral"
        },
    ]

    const ANATOMY_CIRCLES = [
        {coords: [133, 330, 10], fillColor: "#ff0558"},
    ]

    let anatomy_mapAreas = [];
    for (let i = 0; i < ANATOMY_ARROWS.length; i++) {
        anatomy_mapAreas.push({
            name: "",
            shape: "poly",
            coords: getArrowPoints(ANATOMY_ARROWS[i].coords),
            fillColor: ANATOMY_ARROWS[i].fillColor,
            href: "",
        });
    }

    const ANATOMY_MAP = {
        name: "anatomy-map",
        areas: anatomy_mapAreas,
        lineWidth: 0,
    }

    return (
        <Layout>
            <div>
                <h2>Terms of Position and Direction</h2>
                <p className={styles.description}>All of these terms are related to the standard anatomical position, in which the body stands erect, the limbs are extended, and the palms of the hand face forward.</p>
                <div className={styles.anatomyContainer}>
                    <img id={styles.anatomyImg} src={musculoskeletal} />
                    <AnatomyCanvas width={600} height={1000}
                                arrows={ANATOMY_ARROWS} circles={ANATOMY_CIRCLES}
                                textFont={options} />
                    <img id={styles.blankImg} useMap="#anatomy-map"/>
                    <ImageMapper src="" map={ANATOMY_MAP} name="anatomy-map"
                                 orgWidth={300} orgHeight={500} />
                </div>
                <AnatomyText text={[{title: "", description: ""}]} />
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
                data
            }
        }
    }
`
