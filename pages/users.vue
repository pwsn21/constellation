<template>
    <div>
        <div class="tw-p-10">
            <q-markup-table>
                <thead class="bg-primary text-white">
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Role
                    </th>
                    <th>
                        UID
                    </th>
                    <th>
                        Delete
                    </th>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>
                            {{ user.firstName }}
                        </td>
                        <td>
                            {{ user.lastName }}
                        </td>
                        <td>
                            {{ user.role }}
                        </td>
                        <td>
                            {{ user.id }}
                        </td>
                        <td>
                            <q-icon name="delete" color="negative" @click="deleteuser(user.id)" />
                        </td>

                    </tr>
                </tbody>
            </q-markup-table>
        </div>
        <div><q-separator /></div>
        <div class="tw-p-10">
            <q-markup-table>
                <thead class="bg-primary text-white">
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Role
                    </th>
                    <th>
                        UID
                    </th>
                </thead>
                <tbody>
                    <tr v-for="user in adminusers">
                        <td>
                            {{ user.firstName }}
                        </td>
                        <td>
                            {{ user.lastName }}
                        </td>
                        <td>
                            {{ user.role }}
                        </td>
                        <td>
                            {{ user.id }}
                        </td>

                    </tr>
                </tbody>
            </q-markup-table>
        </div>
    </div>
</template>

<script setup>
import { doc, deleteDoc, where, query, onSnapshot, collection, getFirestore } from "firebase/firestore";

const firebaseUser = useFirebaseUser()
const db = getFirestore();

const usercollection = collection(db, 'users')
const queryadmin = query(usercollection, where("role", "==", "Admin"))

const adminusers = ref([])
const users = ref([])

onSnapshot(usercollection, (querySnapshot) => {
    const fbuser = []
    querySnapshot.forEach((doc) => {
        const user = {
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            role: doc.data().role
        }
        fbuser.push(user)
    });
    users.value = fbuser
});

onSnapshot(queryadmin, (querySnapshot) => {
    const fbadminuser = []
    querySnapshot.forEach((doc) => {
        const user = {
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            role: doc.data().role
        }
        fbadminuser.push(user)
    });
    adminusers.value = fbadminuser
});

const deleteuser = id => {
    deleteDoc(doc(usercollection, id))
}

</script>

<style scoped></style>