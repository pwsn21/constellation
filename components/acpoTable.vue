<template>
    <div class="full-width">
        <div>
            <div class="flex justify-center">
                <h2 class="text-h4 center q-pa-md">ACP-Orientation</h2>
            </div>

            <q-expansion-item label="Mentees" class="text-h5 text-primary" header-class="q-pa-none" header-style="bg-white"
                expand-icon-toggle expand-icon-class="text-primary" default-opened dense flat>
                <div v-if="showTable">
                    <div class="q-my-sm" style=" max-width: 250px">
                        <q-input v-model="filterText" class="bg-grey-4" color="primary" header-class="text-primary" dense
                            filled label="Search..." clearable> <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </div>

                    <div>
                        <q-table :rows="filteredMentees" :columns="menteeColumns" row-key="id" title-class="text-h4"
                            table-header-class="bg-primary text-white" @row-click="menteeSelection">
                        </q-table>
                    </div>
                </div>
            </q-expansion-item>
        </div>

    </div>
</template>
  
<script setup>
import { collection, getDocs, getFirestore } from "firebase/firestore";

const emit = defineEmits(["selectedMentee"])
const menteeSelection = (event, row) => {
    emit("selectedMentee", row.id, "acpoView")
};

const showTable = ref(true)

const db = getFirestore()
const acpoCollection = collection(db, 'acpoTracker')
const mentees = ref([])

const querySnapshot = await getDocs(acpoCollection);
querySnapshot.forEach((doc) => {
    const d = doc.data()
    mentees.value.push({
        id: doc.id,
        name: d.firstName + ' ' + d.lastName || null,
        acpoStatus: d.acpoStatus || null,
        cohort: d.cohort || null,
        threePerson: d.threePerson || null,
        currentSupport: d.currentSupport || null,
        currentMilestone: d.currentMilestone || null,
        pped: d.pped?.label || null,
    })
})

const menteeColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'acpoStatus', label: 'Status', field: 'acpoStatus', sortable: true, },
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
            mentee.acpoStatus?.toLowerCase().includes(searchText) ||
            mentee.currentMilestone?.toLowerCase().includes(searchText) ||
            mentee.currentSupport?.toLowerCase().includes(searchText) ||
            mentee.pped?.toLowerCase().includes(searchText)
        );
    });
});

</script>
 
