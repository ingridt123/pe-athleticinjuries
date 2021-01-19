import React from 'react'

import GifPlayer from './gif-player'
import blank from "../images/blank-na.png"
import styles from "./exercises-section.module.css"

const Exercise = ({ title, stillUrl, gifUrl, description }) => (
    <div className={styles.exerciseContainer}>
        {gifUrl ? 
        <GifPlayer stillUrl={stillUrl} gifUrl={gifUrl} alt={title} className={styles.exerciseGif} /> :
        <img src={stillUrl} />
        }
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
                        return <Exercise title={e.title} 
                                         stillUrl={e.stillUrl ? e.stillUrl : blank}
                                         gifUrl={e.gifUrl}
                                         description={e.description} />
                    }
                    return <></>
                })}
            </div>
        );
    }
    return <></>;
}