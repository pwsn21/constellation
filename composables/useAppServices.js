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

import { doc, getDoc, getDocs, getFirestore, collection } from "firebase/firestore"
import { date } from 'quasar'

export const userData = async (fbUID) => {
    if(fbUID){
    const docSnap = getFSDoc("users", fbUID)
    return (await docSnap).data()
    }else{
        return false
    }
}

export const dateLongFormat = async (dateString) => {
    if (dateString){
    const result = await date.formatDate(new Date(dateString), 'dddd MMMM DD, YYYY - HH:mm')
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

    
export const getStations = async () => {
    const options = reactive({station: [],car:[]})
    const stationCollection = await getDocs(getCollection("stations"));
    stationCollection.forEach((station) => {
        options.station.push({
            label: station.id + " - " + station.data().city,
            value: station.id
        })
    })    
    return options.station
}

export const getCars = async (station) => {
    const options = reactive({car:[]})
    const docSnap = await getFSDoc("stations", station)
        docSnap.data().cars.forEach((car) => {
        options.car.push(car);
    })
    return options.car
}