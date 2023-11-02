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

import { getDocs } from "firebase/firestore"
import { date } from 'quasar'

export const dateLongFormat = async (dateString) => {
    if (dateString){
    const result = await date.formatDate(new Date(dateString), 'dddd MMMM DD, YYYY - HH:mm')
    return result
    } else {
        return "N/A"
    }
}
  
export const getStations = async () => {
    const options = reactive({station: [],car:[]})
    const stationCollection = await getDocs(getCollection("stations"));
    stationCollection.forEach((station) => {
        const s = station.data()
        s.label = station.id + " - " + s.city
        s.value = station.id 
        options.station.push(s)
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