<template>
    <div>
        <div class="text-subtitle1 text-weight-bold">
            Name : {{ props.user.name }}
            <q-btn outline size="sm" :disable="isEdit" color="primary" label="Edit" @click="isEdit = !isEdit" />
        </div>
        <q-separator inset />
        <div v-if="isEdit" class="q-mt-sm q-ml-lg">
            <q-btn outline size="sm" color="positive" label="Save" @click="saveProfile" />
            <q-btn outline size="sm" color="negative" label="Cancel" @click="isEdit = !isEdit" />
        </div>
        <div class="text-subtitle1 text-weight-bold">Contact Information </div>
        <q-separator inset />

        <div v-if="props.user">
            <div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">First Name:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user ? props.user.firstName : 'loading' }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.firstName" label="First Name" />
                        </div>
                    </Transition>
                </div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">Last Name:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user ? props.user.lastName : 'loading' }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.lastName" label="Last Name" />
                        </div>
                    </Transition>
                </div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">Phone:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user ? props.user.phoneNumber : 'loading' }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.phoneNumber" label="(###) ### - ####"
                                mask="###-###-####" type="tel" />
                        </div>
                    </Transition>
                </div>
                <div class="row items-center q-mt-sm">
                    <div class="col-3 text-right q-pr-sm">Address:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit">
                            <div>
                                {{ props.user.address }}
                            </div>
                            <div>
                                {{ props.user.city }}
                            </div>
                            <div>
                                {{ props.user.state.label }}
                            </div>
                            <div>
                                {{ props.user.state.countryCode }}
                            </div>
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.address" label="Address" type="text" />
                            <q-input outlined dense v-model="props.user.city" label="City" type="text" />
                            <q-input outlined dense v-model="props.user.state.label" label="Province/State" type="text" />
                            <q-input outlined dense v-model="props.user.country.label" label="Country" type="text" />
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="text-subtitle1 text-weight-bold">Employee Information </div>
        <q-separator inset />
        <div v-if="props.user">
            <div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">PHSA#:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user.employeeNumber }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.employeeNumber" label="Employee Number"
                                type="tel" />
                        </div>
                    </Transition>
                </div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">Car:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user.car }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.car" label="Car" type="tel" />
                        </div>
                    </Transition>
                </div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">Station:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user.station }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.station" label="Station" type="tel" />
                        </div>
                    </Transition>
                </div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">Status:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user.status }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.status" label="Status" type="tel" />
                        </div>
                    </Transition>
                </div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">Platoon:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user.platoon }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.platoon" label="Platoon" type="tel" />
                        </div>
                    </Transition>
                </div>
                <div class="row items-center">
                    <div class="col-3 text-right q-pr-sm">Rotation:</div>
                    <Transition name="fade" mode="out-in">
                        <div v-if="!isEdit" class="row items-center">
                            {{ props.user.rotation }}
                        </div>
                        <div v-else>
                            <q-input outlined dense v-model="props.user.rotation" label="Rotation" type="tel" />
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="text-subtitle1 text-weight-bold">System Information</div>
        <q-separator inset />
        <div v-if="props.user">
            <div class="row">
                <div class="col-2 text-right q-pr-sm">Role(s):</div>
                <div v-if="isEdit && profileData.role.includes('admin')" class="col">
                    <UserRoleAdmin :user="props.user" />
                </div>
                <div v-else>
                    <div v-for="r in props.user.role">
                        <q-badge v-if="roles(r)[0].value === 'admin'" color="red">
                            {{ roles(r)[0].label }}
                        </q-badge>
                        <q-badge v-else color="blue">
                            {{ roles(r)[0].label }}
                        </q-badge>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['user'])
const isEdit = ref(false)

const firebaseUser = await useFirebaseUser()
const profileData = await getUD(firebaseUser.value.uid)

const saveProfile = async () => {
    await setFSDoc("users", props.user.uid, props.user, true)
    console.log(props.user)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>