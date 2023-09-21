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

export const toFirestoreTimestamp = async (dateField) => {
    if (dateField == undefined || dateField == null) {
        return null;
    } else {
        return Timestamp.fromDate(new Date(dateField));
    }
}

export function fromFirestoreTimestamp(timestamp) {
    if (timestamp == null || timestamp == undefined) {
      return null;
    } else {
      const jsDate = timestamp.toDate();
  
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayOfWeek = daysOfWeek[jsDate.getDay()];
  
      const year = jsDate.getFullYear();
      const month = String(jsDate.getMonth() + 1).padStart(2, '0');
      const day = String(jsDate.getDate()).padStart(2, '0');
      const hours = String(jsDate.getHours()).padStart(2, '0');
      const minutes = String(jsDate.getMinutes()).padStart(2, '0');
  
      const dateTimeString = `${dayOfWeek} ${month}-${day}-${year} ${hours}:${minutes}`;
  
      return dateTimeString;
    }
  }

  export function fromFirestoreFullDate(timestamp) {
    if (timestamp == null || timestamp == undefined) {
      return null;
    } else {
      const jsDate = timestamp.toDate();
  
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[jsDate.getDay()];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];       
      const monthName = months[jsDate.getMonth()];
      const year = jsDate.getFullYear();
      const day = String(jsDate.getDate()).padStart(2, '0');
 
      const dateTimeString = `${dayOfWeek} ${monthName} ${day}, ${year}`;
  
      return dateTimeString;
    }
  }
  
  export function fromFirestoreFullDateTime(timestamp) {
    if (timestamp == null || timestamp == undefined) {
      return null;
    } else {
      const jsDate = timestamp.toDate();
  
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[jsDate.getDay()];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];       
      const monthName = months[jsDate.getMonth()];
      const year = jsDate.getFullYear();
      const day = String(jsDate.getDate()).padStart(2, '0');
      const hours = String(jsDate.getHours()).padStart(2, '0');
      const minutes = String(jsDate.getMinutes()).padStart(2, '0');
 
      const dateTimeString = `${dayOfWeek} ${monthName} ${day}, ${year} at ${hours}:${minutes}`;
  
      return dateTimeString;
    }
  }

  export function fromFirestoreQDate(timestamp) {
    if (timestamp == null || timestamp == undefined) {
      return null;
    } else {
      const jsDate = timestamp.toDate();
      const year = jsDate.getFullYear();
      const month = String(jsDate.getMonth() + 1).padStart(2, '0');
      const day = String(jsDate.getDate()).padStart(2, '0');
       
      const dateString = `${year}/${month}/${day}`;
  
      return dateString;
    }
  }
