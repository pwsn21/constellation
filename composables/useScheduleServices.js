import { doc, query, where, or, getDocs, orderBy, and } from "firebase/firestore"
import { date } from 'quasar'

export const qMenteeShifts = async (menteeID) => {
    let shiftData = ref([])
    let shiftNight = ref([])
    let shiftDay = ref([])
    let shiftMisc = ref([])
    
    const shiftsCollection = getCollection("scheduledShifts")
    const q = query(shiftsCollection, or(where("menteeOneID", "==", menteeID), where("menteeTwoID", "==", menteeID)), orderBy('startDate'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach( async (shift) => {
            const s = shift.data()
            const stnDetails = await getStationDetails(s.station)
            s.id = shift.id
            s.shiftEvent = s.startDate
            s.address = stnDetails?.address
            s.menteeOneName = getUD(s.menteeOneID.slice(0,-7)).name
            s.menteeTwoName = s.menteeTwoID ? getUD(s.menteeTwoID.slice(0,-7)).name : "N/A"
            s.mentorName = getUD(s.mentorID).name ? getUD(s.mentorID).name : s.mentorID
            s.mentorPhoneNumber = s.mentorID ? getUD(s.mentorID).phoneNumber : null
            shiftData.value.push(s)
            if(s.car.charAt(s.car.length - 1) === 'D'){
                shiftDay.value.push(s.startDate)
            } else if (s.car.charAt(s.car.length - 1) === 'N'){
                shiftNight.value.push(s.startDate)
            } else {
                shiftMisc.value.push(s.startDate)
            }
        })
            return {shiftData,shiftNight,shiftDay,shiftMisc}
}

export const qMentorShifts = async (mentorID) => {
    let shiftData = ref([])
    let shiftNight = ref([])
    let shiftDay = ref([])
    let shiftMisc = ref([])
    
        const shiftsCollection = getCollection("scheduledShifts");
    const q = query(shiftsCollection, where("mentorID", "==", mentorID))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach( async (shift) => {          
            const s = shift.data()
            const stnDetails = await getStationDetails(s.station)
            s.id = shift.id
            s.shiftEvent = s.startDate
            s.address = stnDetails?.address
            s.menteeOneName = getUD(s.menteeOneID.slice(0,-7)).name
            s.menteeOnePhoneNumber = getUD(s.menteeOneID.slice(0,-7)).phoneNumber
            s.menteeTwoName = s.menteeTwoID ? getUD(s.menteeTwoID.slice(0,-7)).name : "N/A"
            s.menteeTwoPhoneNumber = s.menteeTwoID ? getUD(s.menteeTwoID.slice(0,-7)).phoneNumber : "N/A"
            s.mentorName = getUD(s.mentorID).name ? getUD(s.mentorID).name : s.mentorID
            s.mentorPhoneNumber = s.mentorID ? getUD(s.mentorID).phoneNumber : null
            shiftData.value.push(s)
            if(s.car.charAt(s.car.length - 1) === 'D'){
                shiftDay.value.push(s.startDate)
            } else if (s.car.charAt(s.car.length - 1) === 'N'){
                shiftNight.value.push(s.startDate)
            } else {
                shiftMisc.value.push(s.startDate)
            }
        })
            return {shiftData,shiftNight,shiftDay,shiftMisc}
    }        

export const platoonFromShift =  (shift) => {
    if (shift) {
        
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
}