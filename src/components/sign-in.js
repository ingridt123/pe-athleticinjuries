import React, { useState } from 'react'

import styles from './sign-in.module.css'
import { signInWithGoogle } from '../utils/firebase'
// import favicon from "../images/favicon/icon.png"
import googleSignInButton from "../images/google_signin_buttons/web/2x/btn_google_signin_light_normal_web@2x.png"

export default function SignInBox() {

    // TODO: doesn't work + check if this is set to false on next load
    const [invalidEmail, setInvalidEmail] = useState(false);

    return (
        <div id={styles.container}>
            {/* <Link to="/"><img id={styles.icon} src={favicon} alt="Header icon" /></Link> */}
            <p>Please sign in using your school email to continue.</p>
            <input type="image" src={googleSignInButton} id={styles.googleSignInButton} alt="Google Sign In"
                   onClick={signInWithGoogle.bind(this)} />
            {invalidEmail ? <p id={styles.invalidEmail} className={styles.errorMsg}>Email is invalid.</p> : <></>}
        </div>
    );

}