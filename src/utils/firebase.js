import { useEffect, useReducer, useState } from 'react';
import firebase from "gatsby-plugin-firebase"

const provider = new firebase.auth.GoogleAuthProvider();

function checkValidEmail(email) {
    let regex = /.*@cms.claremont.edu|.*@g.hmc.edu|.*@claremontmckenna.edu|.*@scippscollege.edu|.*@pitzer.edu|.*@pomona.edu/;
    return regex.test(email);
}

// https://firebase.google.com/docs/auth/web/google-signin
export function signInWithGoogle(setInvalidEmail) {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const userEmail = result.user.email;
            if (!checkValidEmail(userEmail)) {
                signOut();
                throw "Invalid email";
            }
            
        }).catch((error) => {
            console.log("error: " + error);
            return false;
        });
    return true;
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
// export function useAuthState(firebase) {
//     const [auth, setAuth] = useState(undefined);

//     const [state, dispatch] = useReducer(
//         (state, action) => {
//             switch (action.type) {
//                 case "auth_state_changed":
//                     return {
//                         ...state,
//                         user: action.user,
//                         loading: false,
//                     };
//                 case "error":
//                     return {
//                         ...state,
//                         error: action.error,
//                         loading: false,
//                     };
//             }
//         },
//         {
//             user: undefined,
//             loading: true,
//             error: undefined,
//         }
//     );
//     useEffect(() => {
//         setAuth(firebase.auth());
//     }, [firebase]);

//     useEffect(() => {
//         if (auth === undefined) return;

//         const unsubscribe = auth.onAuthStateChanged(
//             user => {
//                 dispatch({type: "auth_state_changed", user});
//             },
//             error => {
//                 dispatch({type: "error", error});
//             }
//         );

//         return () => {
//             unsubscribe();
//         };
//     }, [auth]);
//     return [state.user, state.loading, state.error];
// }