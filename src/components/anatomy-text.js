import React from 'react'

import styles from "./anatomy-text.module.css"

const Text = ({ title, description }) => (
    <div className={styles.textContainer}>
        <p className={styles.textTitle}>{title}</p>
        <p className={styles.textDescription}>{description}</p>
    </div>
)

export default function AnatomyText({ text }) {

    return (
        <div className={styles.container}>
            {text.map((t) => (
                <Text title={t.title} description={t.description} />
            ))}
        </div>
    );
}