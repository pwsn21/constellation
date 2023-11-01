import { 
    getFirestore,
    onSnapshot,
    collection
} from "firebase/firestore";
import {useAllUsersData } from "~/composables/useState";

export default defineNuxtPlugin(async nuxtApp => {
    const db = getFirestore();
    const au = useAllUsersData();

    /*
    Create a data listener for the commplete users dataset. On any
    change to the data, modify the data as needed and update the state of the 
    au (useAllUsersData).
    */
    onSnapshot(collection(db, "users"), (snap) => {
        const arr = [];
        for (const [key, value] of Object.entries(snap.docs)){
            let d = value.data()
            d['uid'] = value.id
            d['name'] = value.data().firstName + ' ' + value.data().lastName
            arr.push(d)
        }
        au.value = arr
    });    
})