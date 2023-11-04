import {getDocs, getFirestore, getCountFromServer, query, where, orderBy, doc, and, collection, onSnapshot} from "firebase/firestore"

export const menteeData = async (menteeID) => {
    const docAcpoSnap = await getFSDoc("acpoMentees", menteeID);
    const m = docAcpoSnap.data()
    return m
    }
    
export const menteesData = () => {
    const db = getFirestore()
    const mentees = ref([])
    const q = query(collection(db, "acpoMentees"));
    onSnapshot(q, (querySnapshot) => {
        mentees.value = []
        querySnapshot.forEach((doc) => {
            const d = doc.data()
            d.menteeID = doc.id
            d.name = getUD(d.uid).firstName + ' ' + getUD(d.uid).lastName
            d.pped = d.pped ? getUD(d.pped).name : 'No PPEd Assigned'
            mentees.value.push(d)
            })
        }
        )
        return mentees
}
    

export const qMenteeAttendance = (menteeID, currentMilestone) => {
    const menteeShifts = query(getCollection("acpoFormsAttendance"), where("menteeID", "==", menteeID))
    if (!currentMilestone){
        return menteeShifts
    }else {
        const qMSShifts = queryAnd(menteeShifts, "milestone", currentMilestone,"approvalStatus", "Approved")
    return qMSShifts
}
}

export const optionsMenteeStatus = async (status) => {
    const options = reactive ({mentee: []})
    const menteeCollection = getCollection('acpoMentees')
    const qMentees = query(menteeCollection, where("acpoStatus", "==", status))
    const menteeDocs = await getDocs(qMentees);
    menteeDocs.forEach((mentee) => {
        const m = mentee.data()
        m.value = mentee.id
        m.label = getUD(m.uid).firstName + ' ' + getUD(m.uid).lastName
        options.mentee.push(m)
    }
    )
    return options.mentee
}


export const mentorOptions = async (station, platoon) => {
    const options = reactive ({mentor: [], allMentors:[]})
    const mentorCollection = getCollection('users')
    const qAllMentors = query(mentorCollection, where('role','array-contains','mentor'), orderBy('firstName'));
    const mentorIdsSet = new Set();
    if (station && platoon) {
        const qMentors = query(mentorCollection, and(where('station','==',station),where('platoon','==',platoon),where('role','array-contains','mentor')), orderBy('firstName'))
        const mentorDocs = await getDocs(qMentors)
        mentorDocs.forEach((mentor) => {
            const mentorId = mentor.id
            if (!mentorIdsSet.has(mentorId)) {
                mentorIdsSet.add(mentorId)
                const m = mentor.data()
                options.mentor.push({
                    value: mentorId,
                    label: `${m.firstName} ${m.lastName}`,
                })
            }
        })
    }
    
    const allMentorDocs = await getDocs(qAllMentors)
    allMentorDocs.forEach((mentor) => {
        const mentorId = mentor.id
        if (!mentorIdsSet.has(mentorId)) {
            mentorIdsSet.add(mentorId);
            const m = mentor.data()
            options.allMentors.push({
                value: mentorId,
                label: `${m.firstName} ${m.lastName}`,
            })
        }
    })
    return options
}

export const mentorFormsPendingApproval = async (mentorID) => {
    if (mentorID){
    const pendingAttendance = getCollection('acpoFormsAttendance')
    const result = await getCountFromServer(queryAnd(pendingAttendance,"mentorID", mentorID, 'approvalStatus', 'Pending'))
        if (result.data().count > 0 ){
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export const calcProgress = async (supportLevel, query, requiredmodifier, countmodifer) => {
    const required = ref('')
    const count = ref('')
    const progress = ref('')
    const reqmodifiers = ref(requiredmodifier)
        
    //finds number of required shifts based on mentee support level
        if (supportLevel) {
            const msSupportSnap = await getFSDoc("supportLevels", supportLevel);
            required.value = msSupportSnap.data().requiredShifts
        } else {
            required.value = 0
        }
    //counts number of shifts mentee has done
    const noMSShifts = await getCountFromServer(query)
    count.value = noMSShifts.data() ? noMSShifts.data().count + countmodifer : 0
    //calculate progress - zero if calculates infinity
    progress.value = count.value / (required.value + reqmodifiers.value) || 0

    return {required, count, reqmodifiers, progress}
}

export const msMeetingTable = async () => {  
    const data = reactive({mentee: []})
    const menteeCollection = getCollection('acpoMentees')
    const qMentees = queryAndOr(menteeCollection,'acpoStatus','In Progress','needMSMeeting',true,'needDPMeeting',true)
    const menteeDocs = await getDocs(qMentees)
    menteeDocs.forEach(async (mentee) => {
        const m = mentee.data()
        const required = ref('')
        const msSupportSnap = await getFSDoc('supportLevels', m.currentSupport)
        const attendance = await qMenteeAttendance(mentee.id, m.currentMilestone)
        const count = await getCountFromServer(attendance)
        required.value = msSupportSnap.data().requiredShifts
        const progress = required.value - (count.data().count)
        if (progress < 9 || m.needDPMeeting) {
            m.menteeID = mentee.id
            m.name = `${getUD(m.uid).firstName} ${getUD(m.uid).lastName}`
            m.currentRequired = required.value,
            m.currentCount = count.data().count,
            data.mentee.push(m)
        }
    }     
)
return data.mentee
}



export const getCohorts = async () => {
    const db = getFirestore()    
    const results = ref([])
    const acpoCohortCollection = collection(db, "acpoCohort");
    const qActiveCohorts = query(acpoCohortCollection, where("status", "==", "active"));
    const cohortsActive = await getDocs(qActiveCohorts);
    cohortsActive.forEach((cohort) => {
        results.value.push(cohort.id)
        })
    return results.value
    }

export function getUD(uid) {
        const au = useAllUsersData()
        const user = au.value.find((data) => data.uid === uid);
        if (user) {
            return user
        } else {
            return null
        }
    }
export async function getStationDetails(stnNumber) {
        const allStations = await getStations()
        const station = allStations.find((data) => data.number === stnNumber);
        if (station) {
            return station
        } else {
            return null
        }
    }

