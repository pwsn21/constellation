import { Timestamp } from "firebase/firestore";
// imports 

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
  export function formatFirestoreTimestamp(dateField, format) {
    if (dateField == null || dateField == undefined) {
      return null;
    } else {
      const jsDate = dateField.toDate();
  
      const daysOfWeekShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
      const daysOfWeekLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      const year = jsDate.getFullYear();
      const month = String(jsDate.getMonth() + 1).padStart(2, '0');
      const day = String(jsDate.getDate()).padStart(2, '0');
      const hours = String(jsDate.getHours()).padStart(2, '0');
      const minutes = String(jsDate.getMinutes()).padStart(2, '0');
      
      const dayOfWeekShort = daysOfWeekShort[jsDate.getDay()];
      const dayOfWeekLong = daysOfWeekLong[jsDate.getDay()];
      const monthName = months[jsDate.getMonth()];
  
      if (format === 'fullDate') {
        return `${dayOfWeekLong} ${monthName} ${day}, ${year}`;
      } else if (format === 'qDate') {
        return `${year}/${month}/${day}`;
      } else if (format === 'shortDateTime') {
        return `${dayOfWeekShort} ${month}-${day}-${year} ${hours}:${minutes}`;
      } else if (format === 'longDateTime') {
        return `${dayOfWeekLong} ${monthName} ${day}, ${year} at ${hours}:${minutes}`;
      } else {
        return "Specify Format"
      }
    }
  }
  