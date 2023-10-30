<template>
    <div>
        Admin: {{ isAdmin }}
        Role: {{ isRole }}
        <div v-if="isRole.includes('admin') || isRole.includes('pped')">Admin or PPE</div>
    </div>
</template>

<script setup>
import { query, where, getDocs } from 'firebase/firestore'
const firebaseUser = useFirebaseUser()
const isRole = useIsRole()
const isAdmin = useIsAdminUser()
const profileRole = ref([])

const docRolesSnap = await getFSDoc("groups", "conRoles")

const assignRole = await setFSDoc('users', firebaseUser.value.uid, { role: [] }, true)
Object.keys(docRolesSnap.data()).forEach(async role => {
    const roles = docRolesSnap.data()[role]
    if (roles.includes(firebaseUser.value.uid)) {
        profileRole.value.push(role)
        console.log(profileRole.value)
        await setFSDoc('users', firebaseUser.value.uid, { role: profileRole.value }, true)
    }
    isRole.value = profileRole.value
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