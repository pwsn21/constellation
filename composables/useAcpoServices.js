import {getDocs, getFirestore, getCountFromServer, query, where, orderBy,} from "firebase/firestore"

export const menteeData = async (menteeID) => {
    const docAcpoSnap = await getFSDoc("acpoMentees", menteeID);
    return (await docAcpoSnap).data()
    }

export const qMenteeAttendance = (mID, currentMilestone) => {
    const menteeShifts = query(getCollection("acpoFormsAttendance"), where("menteeID", "==", mID))
    const qMSShifts = queryAnd(menteeShifts, "milestone", currentMilestone,"approvalStatus", "Approved")
    return qMSShifts
}

export const optionsMenteeStatus = async (status) => {
    const options = reactive ({mentee: []})
    const db = getFirestore()
    const menteeCollection = getCollection('acpoMentees')
    const qMentees = query(menteeCollection, where("acpoStatus", "==", status))
    const menteeDocs = await getDocs(qMentees);
    menteeDocs.forEach((mentee) => {
    options.mentee.push({
        value: mentee.id,
        label: mentee.data().firstName + " " + mentee.data().lastName,
    });
});
return options.mentee
}

export const mentorOptions = async (station, platoon) => {
    const options = reactive ({mentor: [], allMentors:[]})
    const mentorCollection = getCollection('acpoMentors')
    const qAllMentors = query(mentorCollection, orderBy('mentorName'));
    const qMentors = queryAnd(mentorCollection,"station",station,"platoon",platoon)
    const mentorDocs = await getDocs(qMentors);
    mentorDocs.forEach((mentor) => {
    options.mentor.push({
        value: mentor.id,
        label: mentor.data().mentorName,
        });
    });
        const allMentorDocs = await getDocs(qAllMentors);
        allMentorDocs.forEach((mentor) => {
        options.allMentors.push({
            value: mentor.id,
            label: mentor.data().mentorName,
            })
        });
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

export const calcProgress = async (supportLevel, query) => {
    const required = ref('')
    const count = ref('')
    const progress = ref('')
    //finds number of required shifts based on mentee support level
        if (supportLevel) {
            const msSupportSnap = await getFSDoc("supportLevels", supportLevel);
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
            data.mentee.push({
                id: mentee.id,
                name: `${m.firstName} ${m.lastName}`,
                currentSupport: m.currentSupport,
                currentMilestone: m.currentMilestone,
                currentRequired: required.value,
                currentCount: count.data().count,
            })
    }     
})
return data.mentee
}