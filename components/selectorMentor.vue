<template>
    <div>
        <q-select label='Mentor' v-model="mentor" :options="['Patrick', 'not Patrick']" filled :model-value="mentor"
            @update:model-value="value => emit('update:mentor', value)" map-options />
    </div>
</template>

<script setup>

import { query, where, getDocs, collection, getFirestore, orderBy, } from "firebase/firestore";
const props = defineProps(['mentor']);
const emit = defineEmits(['update:mentor'])

const db = getFirestore()
const userCollection = collection(db, 'users');
const queryMentors = query(userCollection, where('role', 'in', ['Paramedic Practice Educator', 'Mentor']), orderBy('firstName'))
const mentorDocs = await getDocs(queryMentors);


const mentor = ref('')
const options = reactive({
    mentors: [],
})

mentorDocs.forEach((mentor) => {
    options.mentors.push({
        value: mentor.id,
        label: mentor.data().firstName + " " + mentor.data().lastName,
    });
});

</script>

<style scoped></style>