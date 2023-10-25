<template>
    <div>
        Admin: {{ isAdmin }}
        Role: {{ isRole }}
        <div v-if="isRole === 'admin' || isRole === 'pped'">Admin or PPE</div>
    </div>
</template>

<script setup>
import { query, where, getDocs } from 'firebase/firestore'
const firebaseUser = useFirebaseUser()
const isRole = useIsRole()
const isAdmin = useIsAdminUser()

// leftover from deciding to make roles a string or an array
// const assignRole = await setFSDoc('users', firebaseUser.value.uid, { role: [] }, true)


const docRolesSnap = await getFSDoc("groups", "conRoles")

Object.keys(docRolesSnap.data()).forEach(async role => {
    const roles = docRolesSnap.data()[role]
    if (roles.includes(firebaseUser.value.uid)) {
        // leftover from deciding to make roles a string or an array
        // profileRole.value.push(role)
        await setFSDoc('users', firebaseUser.value.uid, { role: role }, true)
        isRole.value = role
    }
}
)

const adminCollection = getCollection('groups')
const q = query(adminCollection, where("admin", "array-contains", firebaseUser.value.uid))
const docSnap = await getDocs(q)
if (docSnap.size > 0) {
    isAdmin.value = true
} else {
    isAdmin.value = false
}
</script>

<style scoped></style>