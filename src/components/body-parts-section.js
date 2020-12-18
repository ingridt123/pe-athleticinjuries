import React from 'react'

import styles from "./body-parts-section.module.css"

// TODO: use react-gif-player
const Exercise = ({ title, gif, description }) => (
    <div className={styles.exerciseContainer}>
        <img src={gif} alt="" className={styles.exerciseGif} />
        <div>
            <p className={styles.exerciseTitle}>{title}</p>
            <p className={styles.exerciseDescription}>{description}</p>
        </div>
    </div>
)

// TODO: add links for headers?
export default function BodyPartsSection({ headerText, exercises }) {
    return (
        <div>
            <h2>{headerText}</h2>
            {exercises.map( e  => {
                if (e.title !== null) {
                    return <Exercise
                        title={e.title}
                        gif={e.gifUrl}
                        description={e.description}
                    />
                }
            })}
        </div>
    );
}