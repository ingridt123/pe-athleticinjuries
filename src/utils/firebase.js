import { useEffect, useReducer, useState } from 'react';
import firebase from "gatsby-plugin-firebase"

function checkValidEmail(email, data) {
    // Emails added to whitelist
    for (let i = 0; i < data.allUser.nodes.length; i++) {
        if (data.allUser.nodes[i].email === email) {
            return true;
        }
    }

    // School emails
    let regex = /.*@cms.claremont.edu|.*@g.hmc.edu|.*@claremontmckenna.edu|.*@scippscollege.edu|.*@pitzer.edu|.*@pomona.edu/;
    return regex.test(email);
}

// https://firebase.google.com/docs/auth/web/google-signin
export function signInWithGoogle(data) {
    const provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider, data);
}

// TODO: https://firebase.google.com/docs/auth/web/microsoft-oauth
// export function signInWithMicrosoft(data) {
//     const provider = new firebase.auth.OAuthProvider('microsoft.com');
//     signIn(provider, data);
// }

function signIn(provider, data) {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const userEmail = result.user.email;
            if (!checkValidEmail(userEmail, data)) {
                signOut();
                throw "Invalid email";
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
}

export function signOut() {
    firebase.auth()
        .signOut()
        .then(() => {
            // Sign out successful
        }).catch((error) => {
            console.log("error: " + error);
        });
}

// Source: https://gist.github.com/jeffreymeng/78bd7f6b0f301fa5ef04359cd512222b
export function useAuthState_build(firebase) {
    const [auth, setAuth] = useState(undefined);

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "auth_state_changed":
                    return {
                        ...state,
                        user: action.user,
                        loading: false,
                    };
                case "error":
                    return {
                        ...state,
                        error: action.error,
                        loading: false,
                    };
            }
        },
        {
            user: undefined,
            loading: true,
            error: undefined,
        }
    );
    useEffect(() => {
        setAuth(firebase.auth());
    }, [firebase]);

    useEffect(() => {
        if (auth === undefined) return;

        const unsubscribe = auth.onAuthStateChanged(
            user => {
                dispatch({type: "auth_state_changed", user});
            },
            error => {
                dispatch({type: "error", error});
            }
        );

        return () => {
            unsubscribe();
        };
    }, [auth]);
    return [state.user, state.loading, state.error];
}