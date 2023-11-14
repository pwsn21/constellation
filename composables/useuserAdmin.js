import { collection, query, onSnapshot, getDocs, getFirestore, doc, updateDoc } from "firebase/firestore";
import { useAllUsersData } from "./useState";

export const initUsers = async () => {
    const au = useAllUsersData();
    const db = getFirestore();
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
}

export const roles = (role = '', roleName = '') => {
    const roleOptions = [
        { value: "admin", label: "Administrator" },
        { value: "mentee", label: "Mentee" },
        { value: "mentor", label: "Mentor" },
        { value: "scheduler", label: "Scheduler" },
        { value: "pped", label: "Paramedic Practice Educator" },
    ]

    return roleOptions.filter((option) => {
        return (
            option.value.toString().includes(role) ||
            option.label.toString().includes(role)
        );
    });
}

export const clearAllRoles = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(async (userDoc) => {
        const userRef = doc(db, "users", userDoc.id);
        await updateDoc(userRef, {
            "role": [],
        });

    });
}

export const addRole = async (user, role) => {
    const db = getFirestore();
    const userRoles = user.role
    if (!user.role.includes(role)) {
        userRoles.push(role);
    }
    console.log(userRoles)
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
        "role": userRoles,
    }); 
};

export const removeRole = async (user, role) => {
    const db = getFirestore();
    let userRoles = user.role
    userRoles = userRoles.filter(function (letter) {
        return letter !== role;
    });

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
        "role": userRoles,
    }); 
};


