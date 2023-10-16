import { doc, getDoc, getFirestore, getCountFromServer, collection, query, where, or, getDocs, orderBy, and } from "firebase/firestore"
import { date } from 'quasar'

export const qMenteeShifts = async (menteeID) => {
    let shiftData = ref([])
    let shiftEvent = ref([])
    const db = getFirestore()
    const shiftsCollection = collection(db, "scheduledShifts");
    const q = query(shiftsCollection, or(where("menteeOneID", "==", menteeID), where("menteeTwoID", "==", menteeID)), orderBy('startDate'))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach( async (shift) => {
            const s = shift.data()
            shiftData.value.push({
                id: shift.id,
                car: s.car,
                platoon: s.platoon,
                menteeOneName: s.menteeOneName,
                menteeTwoName: s.menteeTwoName,
                menteeOneID: s.menteeOneID,
                menteeTwoID: s.menteeTwoID,
                mentorName: s.mentorName,
                mentorID: s.mentorID,
                dateDisplay: date.formatDate(s.startDate, 'dddd MMMM Do, YYYY'),
                shiftEvent: s.startDate,
                startTime: s.startTime,
                endTime: s.endTime
            })
            shiftEvent.value.push(s.startDate)
        })
    return {shiftData,shiftEvent}
}

export const qMenteeDupe = async (menteeID, shiftDate) => {
    let shiftData = ref([])
    
    const db = getFirestore()
    const shiftsCollection = collection(db, "scheduledShifts");
    const q = query(shiftsCollection, and(or(where("menteeOneID", "==", menteeID), where("menteeTwoID", "==", menteeID)), where('startDate', '==', shiftDate)), orderBy('startDate'))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach( async (shift) => {
            const s = shift.data()
            shiftData.value.push({
                id: shift.id,
                car: s.car,
                platoon: s.platoon,
                menteeOneName: s.menteeOneName,
                menteeTwoName: s.menteeTwoName,
                menteeOneID: s.menteeOneID,
                menteeTwoID: s.menteeTwoID,
                mentorName: s.mentorName,
                mentorID: s.mentorID,
                startDate: s.startDate,
                startTime: s.startTime,
                endTime: s.endTime
            })
            
        })
    return shiftData
}


export const qMentorShifts = async (mentorID) => {
    let shiftData = ref([])
    const db = getFirestore()
    const shiftsCollection = collection(db, "scheduledShifts");
    const q = query(shiftsCollection, where("mentorID", "==", mentorID))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((shift) => {
            const s = shift.data()
            shiftData.value.push({
                id: shift.id,
                car: s.car,
                menteeOneName : s.menteeOneName,
                menteeTwoName : s.menteeTwoName,
                shiftDateTime: s.shiftDateTime,
            })
        })
    return shiftData
}


export const platoonFromShift =  (shift) => {
    const shiftDate = ref('')
    let dayNumber = ref('')
    const dayInMilli = 1000 * 60 * 60 * 24
    let platoonDay = ref('')
    let platoonNight = ref('')

    shiftDate.value = new Date(shift).getTime()
    dayNumber.value = Math.floor((shiftDate.value / dayInMilli) % 8)
    if (dayNumber.value === 1 || dayNumber.value === 2) {
        platoonDay.value = 'A'
        platoonNight.value = 'D'
    } else if (dayNumber.value === 3 || dayNumber.value === 4) {
        platoonDay.value = 'B'
        platoonNight.value = 'A'
    } else if (dayNumber.value === 5 || dayNumber.value === 6) {
        platoonDay.value = 'C'
        platoonNight.value = 'B'
    } else if (dayNumber.value === 7 || dayNumber.value === 0) {
        platoonDay.value = 'D'
        platoonNight.value = 'C'
    }
    return {platoonDay, platoonNight}
}