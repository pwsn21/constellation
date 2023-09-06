import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail
 } from "firebase/auth";
 
import { 
    doc,
    getDoc, setDoc,
    getFirestore
} from "firebase/firestore";

export const createUser = async (email, password) => {
    const auth = getAuth();
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            const result = sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('Verified email sent successfully');
                return true})
            navigateTo("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return error
        });
    return credentials;  
}

export const signInUser = async (email, password) => {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            return error
        });
    return credentials;
}

export const signOutUser = async () => {
    const auth = getAuth();
    const result = await auth.signOut();
    return result;
}

export const verifyEmail = async () => {
    const auth = getAuth();
    const result = sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('Verified email sent successfully');
            return true
        });
    return result;
}

export const resetPasswordEmail = async (email) => {
    const auth = getAuth();
    const result = sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log('Reset password email sent successfully');
        navigateTo("/")
        return true
    })
    .catch((error) => {
        return error;
    });
    return result;
}

export const initUser = async () => {
    const auth =  getAuth()
    const firebaseUser = useFirebaseUser();
    const authNeeded = useAuthNeeded();
    const isAdmin = useIsAdminUser();
    const isAuthStateUpdated = useIsAuthStateUpdated();

    onAuthStateChanged(auth, async (user) => {
        if(user){
            if(user.emailVerified){
                console.log("emailisverified")
                firebaseUser.value = user
            } else {
                console.log("emailnotverified")
                firebaseUser.value = false;
            }

        } else {
            firebaseUser.value = false;  

        }
        isAuthStateUpdated.value = true;
        //const db = getFirestore();
        // try {
        //     const docRef = doc(db, "admins", auth.currentUser.uid );
        //     const docSnap = await getDoc(docRef);
        //     if(docSnap.exists()) {
        //         isAdmin.value = true;
        //     } else {
        //         isAdmin.value = false;
        //     }
        //   } catch (error) {
        //     isAdmin.value = false;
        //   } 
    });
}