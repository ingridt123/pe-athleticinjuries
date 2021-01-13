import React, {useState} from 'react'

import styles from './gif-player.module.css'

export default function GifPlayer({ stillUrl, gifUrl, alt }) {

    // TODO: testing only
    // stillUrl = "https://source.unsplash.com/random/400x200";
    // gifUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/eea4db52948307.5d361f7a3f35e.gif";

    const [paused, setPaused] = useState(true);
    function togglePaused() {
        setPaused(!paused);
    }

    return (
        <div className={styles.gifPlayer}>
            {paused ?
            <div className={styles.gifButton} onClick={togglePaused.bind(this)}>
                <p>GIF</p>
            </div> : <></>}
            <img src={paused ? stillUrl : gifUrl} alt={alt}
                 onClick={togglePaused.bind(this)}/>
        </div>
    )
}