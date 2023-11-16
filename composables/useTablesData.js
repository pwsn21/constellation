import { collection, onSnapshot, getFirestore, query, orderBy, limit } from "firebase/firestore";

export const scheduledShifts = () => {
    const db = getFirestore()
    const q = query(collection(db, "scheduledShifts"), orderBy("creationDate", "desc"), limit(700))
    const arr = ref([])
    onSnapshot(q, (snap) => {
        arr.value = []
    for (const [key, value] of Object.entries(snap.docs)) {
        let d = value.data()
        d.shiftID = value.id
        d.creationDate = d.creationDate?.toDate()?.toLocaleString()
        d.menteeOneName = getUD(d.menteeOneID.slice(0, -7)).name
        d.menteeOneEE = getUD(d.menteeOneID.slice(0, -7)).employeeNumber
        d.menteeTwoName = d.menteeTwoID ? getUD(d.menteeTwoID.slice(0, -7)).name : "N/A"
        d.menteeTwoEE = d.menteeTwoID ? getUD(d.menteeTwoID.slice(0, -7)).employeeNumber : "N/A"
        d.mentorName = getUD(d.mentorID).name ? getUD(d.mentorID).name : d.mentorID
        arr.value.push(d)
    }
    })
    return arr
}

export const allStations = () => {
    const db = getFirestore();
    const arr = ref([])
    onSnapshot(collection(db, "stations"), (snap) => {
        arr.value = []
        for (const [key, value] of Object.entries(snap.docs)) {
            let d = value.data()
            arr.value.push(d)
        }
    })
    return arr
}