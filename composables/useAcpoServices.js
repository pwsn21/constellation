import { doc, getDoc,getDocs, getFirestore, getCountFromServer, collection, query, where,orderBy } from "firebase/firestore"

export const menteeData = async (menteeID) => {
    const db = getFirestore()
    const docAcpoRef = doc(db, "acpoMentees", menteeID);
    const docAcpoSnap = await getDoc(docAcpoRef);
    return (await docAcpoSnap).data()
    }

export const qMenteeAttendance = (mID) => {
    const db = getFirestore()
    const menteeShifts = query(collection(db, "acpoFormsAttendance"), where("mID", "==", mID))
    const qMSTwoShifts = query(menteeShifts, where("milestone", "==", "Milestone 2"), where("approvalStatus", "==", "Approved"))
    const qMSThreeShifts = query(menteeShifts, where("milestone", "==", "Milestone 3"), where("approvalStatus", "==", "Approved"))
    const qMSFourShifts = query(menteeShifts, where("milestone", "==", "Milestone 4"), where("approvalStatus", "==", "Approved"))
    return {menteeShifts, qMSTwoShifts,qMSThreeShifts,qMSFourShifts}
}


export const activeMenteeOptions = async () => {
    const options = reactive ({mentee: []})
    const db = getFirestore()
    const menteeCollection = collection(db, 'acpoMentees');
    const qMentees = query(menteeCollection, where("acpoStatus", "==", "In Progress"));
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
    const db = getFirestore()
    const mentorCollection = collection(db, 'acpoMentors')
    const qAllMentors = query(mentorCollection, orderBy('mentorName'));
    const qMentors = query(mentorCollection, where("station", "==", station), where("platoon", "==", platoon));
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
        const db = getFirestore()
    const pendingAttendance = collection(db, 'acpoFormsAttendance')
    const result = await getCountFromServer(query(pendingAttendance, where("mentorID", "==", mentorID), where("approvalStatus", "==", "Pending")))
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