<template>
    <div class="row justify-center">
        <div class="q-pa-md full-width" style="max-width: 850px;">
            <userProfileView v-if="profileMode == 'userView'" @adminUserMode="onProfileMode" />
            <userProfileEdit v-if="profileMode == 'userEdit'" @adminUserMode="onProfileMode" />
        </div>
    </div>
</template>

<script setup>

const firebaseUser = useFirebaseUser()
const docSnap = await getFSDoc("users", firebaseUser.value.uid);

const profileMode = ref('userView')

if (!docSnap.data().firstName) {
    profileMode.value = 'userEdit'
}

const onProfileMode = (id, mode) => {
    profileMode.value = mode
}

</script>

<style scoped></style>