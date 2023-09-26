import { doc, where, query, collection, getDocs, getFirestore } from "firebase/firestore";

export const useAcpoTableData = async () => {
    const db = getFirestore()
    const acpoCollection = collection(db, 'acpoTracker')
    const mentees = []

    const querySnapshot = await getDocs(acpoCollection);
    //console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        const d = doc.data()
        mentees.push({
            id: doc.id,
            name: d.firstName + ' ' + d.lastName || null,
            cohort: d.cohort || null,
            threePerson: d.threePerson || null,
            currentSupport: d.currentSupport || null,
            currentMilestone: d.currentMilestone || null,
            pped: d.pped?.label || null,
        })
     })
    return mentees
}