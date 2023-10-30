<template>
    <div class="full-width">
        <q-card>
            <q-card-section>

                <div class="row justify-between">
                    <div class="text-h4">
                        {{ userProfile.firstName }} {{ userProfile.lastName }}
                    </div>
                    <div>
                        <q-btn icon="edit" round flat @click="$emit('adminUserMode', userID.selectedUserID, 'userEdit')" />
                    </div>
                </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Contact Information </div>
                <q-separator inset />
                <q-list dense>
                    <q-item>
                        Phone: {{ userProfile.phoneNumber }}
                    </q-item>
                    <q-item>
                        Address:
                    </q-item>
                    <q-item>{{ userProfile.address }} </q-item>
                    <q-item>{{ userProfile.city }},
                        <!-- error that can't read label if not put in a conditional even though it exists.... -->
                        {{ userProfile.state ? userProfile.state.label : 'N/A' }},

                        {{ userProfile.country ? userProfile.country.label : 'N/A' }}
                    </q-item>
                </q-list>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Employee Information </div>
                <q-separator inset />
                <q-list dense>
                    <q-item>
                        Employee Number: {{ userProfile.employeeNumber }}
                    </q-item>
                    <q-item>
                        {{ userProfile.car ? 'Car : ' + userProfile.car : 'Station: ' + userProfile.station }}
                    </q-item>
                    <q-item>
                        Role: {{ userProfile.role }}
                    </q-item>
                    <q-item>
                        Status: {{ userProfile.status }}
                    </q-item>
                    <q-item>
                        Platoon\Rotation: {{ userProfile.platoon }}{{ userProfile.rotation }}
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </div>
</template>


<script setup>
const emit = defineEmits(["adminUserMode"])
const userID = defineProps(['selectedUserID'])

const firebaseUser = useFirebaseUser()
const toDisplay = ref('')
const userProfile = ref('')

watchEffect(async () => {
    //Depends on if admin is viewing user profile or if user is viewing their own profile
    toDisplay.value = userID.selectedUserID ? userID.selectedUserID : firebaseUser.value.uid
    try {
        userProfile.value = await (userData(toDisplay.value))
    } catch (error) {
        console.error(error)
    }
})
</script>
<style scoped></style>