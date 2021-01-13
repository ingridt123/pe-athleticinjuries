import React from 'react'

import GifPlayer from './gif-player'
import styles from "./exercises-section.module.css"

// TODO: use react-gif-player
const Exercise = ({ title, stillUrl, gifUrl, description }) => (
    <div className={styles.exerciseContainer}>
        <GifPlayer stillUrl={stillUrl} gifUrl={gifUrl} alt={title} className={styles.exerciseGif} />
        <div>
            <p className={styles.exerciseTitle}>{title}</p>
            <p className={styles.exerciseDescription}>{description}</p>
        </div>
    </div>
)

// TODO: add links for headers?
// TODO: global state?
export default function ExercisesSection({ headerText, exercises }) {
    // const [mobile, setMobile] = useState(window.innerWidth < MOBILE_WIDTH);
    // useEffect(() => {
    //     window.addEventListener('resize', () => {setMobile(window.innerWidth < MOBILE_WIDTH);});
    // }, [])
    // ${mobile ? styles.exerciseContainer_mobile : ""}

    if (exercises.length !== 0) {
        return (
            <div>
                <h2>{headerText}</h2>
                {exercises.map( e  => {
                    if (e.title !== null) {
                        return <Exercise title={e.title} stillUrl={e.stillUrl} gifUrl={e.gifUrl}
                                         description={e.description} />
                    }
                    return <></>
                })}
            </div>
        );
    }
    return <></>;
}