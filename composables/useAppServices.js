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

import { doc, getDoc, getFirestore, getCountFromServer, collection, query, where } from "firebase/firestore"
import { date } from 'quasar'

export const qMenteeShifts = (mID) => {
    const db = getFirestore()
    const menteeShifts = query(collection(db, "scheduledShifts"), where("mID", "==", mID))
    const qMSTwoShifts = query(menteeShifts, where("milestone", "==", "Milestone 2"), where("mentorApproval", "==", "approved"))
    const qMSThreeShifts = query(menteeShifts, where("milestone", "==", "Milestone 3"), where("mentorApproval", "==", "approved"))
    const qMSFourShifts = query(menteeShifts, where("milestone", "==", "Milestone 4"), where("mentorApproval", "==", "approved"))
    return {qMSTwoShifts,qMSThreeShifts,qMSFourShifts}
}

export const userData = async (fbUID) => {
        const db = getFirestore()
    const docRef = await doc(db, "users", fbUID)
    const docSnap = getDoc(docRef)
    return (await docSnap).data()
    }

export const menteeData = async (menteeID) => {
    const db = getFirestore()
    const docAcpoRef = doc(db, "acpoTracker", menteeID);
    const docAcpoSnap = await getDoc(docAcpoRef);
    return (await docAcpoSnap).data()
    }

export const mentorPendingApproval = async (mentorID) => {
    const db = getFirestore()
    const pendingAttendance = collection(db, 'scheduledShifts')
    const result = await getCountFromServer(query(pendingAttendance, where("mentor", "==", mentorID), where("mentorApproval", "==", "pending")))
        if (result.data().count > 0 ){
            return true
        } else {
            return false
        }
    }

export const dateLongFormat = async (timestamp) => {
    if (timestamp){
    const result = await date.formatDate(timestamp.toDate(), 'dddd MMMM d YYYY HH:mm')
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

export const calcProgress = async (supportLevel, query) => {
    const db = getFirestore()
    const required = ref('')
    const count = ref('')
    const progress = ref('')

    //finds number of required shifts based on mentee support level
        if (supportLevel) {
            const msSupportRef = doc(db, "supportLevels", supportLevel);
            const msSupportSnap = await getDoc(msSupportRef);
            required.value = msSupportSnap.data().requiredShifts
        } else {
            required.value = 0
        }

    //counts number of shifts mentee has done
    const noMSShifts = await getCountFromServer(query)
    count.value = noMSShifts.data() ? noMSShifts.data().count : 0

    //calculate progress - zero if calculates infinity
    progress.value = count.value / required.value || 0

    return {required, count, progress}
}

