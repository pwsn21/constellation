import { getDocs } from "firebase/firestore"

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

export function getUD(uid) {
    const au = useAllUsersData()
    const user = au.value.find((data) => data.uid === uid);
    if (user) {
        return user
    } else {
        return {firstName: 'no user found', lastName:'no last',role: []}
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

