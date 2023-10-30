import { doc, getDoc,getDocs, getFirestore, getCountFromServer, setDoc, collection, query, where, orderBy, or, and } from "firebase/firestore"

export const getCollection =  (fsCollection) => {
    const db = getFirestore()
    const result = collection(db, fsCollection)
    return result
}

export const queryAnd =  (fsCollection,key1,value1,key2,value2) => {   
    const qAnd = query(fsCollection, and(where(key1, "==", value1), where(key2, "==", value2)))
    return qAnd
}
export const queryOr =  (fsCollection,key1,value1,key2,value2) => {   
    const coll = getCollection(fsCollection)
    const qOr = query(coll, or(where(key1, "==", value1), where(key2, "==", value2)))
    return qOr
}
export const queryAndOr =  (fsCollection,key1,value1,keyA,valueA,keyB,valueB) => {   
    const qAndOr = query(fsCollection, 
        and(
            where(key1, "==", value1),
            or(
                where(keyA, "==", valueA), 
                where(keyB, "==", valueB)
                )))
                return qAndOr
            }
            
export const getFSDoc = async (fsCollection,fsDoc) => {   
    const db = getFirestore()
    const docRef = doc(db, fsCollection, fsDoc)
    const docSnap = await getDoc(docRef)
    return docSnap
}

export const setFSDoc = async (fsCollection, docID, value, merge) => {
    const db = getFirestore()
    await setDoc(doc(db, fsCollection, docID), value,{merge:merge})
}