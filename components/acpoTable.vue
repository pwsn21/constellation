<template>
    <div class="full-width">
        <div>
            <div class="flex justify-center">
                <h2 class="text-h4 center q-pa-md">ACP-Orientation</h2>
            </div>
            <h2 class="text-h5 text-primary">Mentees</h2>
            <div class="q-my-sm" style=" max-width: 250px">
                <q-input v-model="filterText" class="bg-grey-4" dense filled label="Search..." clearable />
            </div>
            <div>
                <q-table :rows="filteredMentees" :columns="menteeColumns" row-key="id" title-class="text-h4"
                    table-header-class="bg-red-9 text-white" @row-click="menteeSelection">
                </q-table>

            </div>
        </div>

    </div>
</template>
  
<script setup>
import { collection, getDocs, getFirestore } from "firebase/firestore";

const emit = defineEmits(["selectedMentee"])
const menteeSelection = (event, row) => {
    emit("selectedMentee", row.id, "acpoView")
};

const db = getFirestore()
const acpoCollection = collection(db, 'acpoTracker')
const mentees = ref([])

const querySnapshot = await getDocs(acpoCollection);
querySnapshot.forEach((doc) => {
    const d = doc.data()
    mentees.value.push({
        id: doc.id,
        name: d.firstName + ' ' + d.lastName || null,
        cohort: d.cohort || null,
        threePerson: d.threePerson || null,
        currentSupport: d.currentSupport || null,
        currentMilestone: d.currentMilestone || null,
        pped: d.pped?.label || null,
    })
})

const menteeColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'cohort', label: 'Cohort', field: 'cohort', sortable: true, },
    { name: 'milestone', label: 'Milestone', field: 'currentMilestone' },
    { name: 'currentSupport', label: 'Support Level', field: 'currentSupport' },
    { name: 'threePerson', label: 'No. on car', field: 'threePerson' },
    { name: 'pped', label: 'Practice Educator', field: 'pped', sortable: true },
];

const filterText = ref('')
const filteredMentees = computed(() => {
    const searchText = filterText.value ? filterText.value.toLowerCase().trim() : ''
    return mentees.value.filter((mentee) => {
        return (
            mentee.name.toLowerCase().includes(searchText) ||
            mentee.cohort.toString().includes(searchText) ||
            mentee.currentMilestone.toLowerCase().includes(searchText) ||
            mentee.currentSupport.toLowerCase().includes(searchText) ||
            mentee.pped.toLowerCase().includes(searchText)
        );
    });
});

</script>
  