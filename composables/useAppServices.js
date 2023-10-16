export const useNotification = () => {
    const q = useQuasar()
    const showToast = (color, icon, message) => {
            q.notify({
                color: color,
                textColor: 'white',
                icon: icon,
                message: message,
                position: 'top'
            });
    }
    return {
        showToast,
    }
}

import { doc, getDoc, getFirestore } from "firebase/firestore"
import { date } from 'quasar'

export const userData = async (fbUID) => {
    if(fbUID){
    const db = getFirestore()
    const docRef = await doc(db, "users", fbUID)
    const docSnap = getDoc(docRef)
    return (await docSnap).data()
    }else{
        return false
    }
}

export const dateLongFormat = async (dateString) => {
    if (dateString){
    const result = await date.formatDate(new Date(dateString), 'dddd MMMM DD, YYYY - HH:mm')
    return result
    } else {
        return "N/A"
    }
}

export const datePickerFormat = async (timestamp) => {
    if (timestamp){
    const result = await date.formatDate(timestamp.toDate(), 'ddd, MM/DD/YYYY, HH:mm')
    return result
    } else {
        return null
    }
}

export const firestoreTimestamp = async (fromPicker) => {
    const result = fromPicker ? new Date(fromPicker) : null
    return result
    }