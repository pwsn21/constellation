<template>
    <div class="column items-center">
        <div class="q-ma-sm flex" style="width: 800px;">

            <q-table :filter="filter" :rows="au" :columns="columns" row-key="uid" @row-click="onUserSelected" title="Users"
                title-class="text-h4" table-header-class="bg-primary text-white"
                :pagination="{ sortBy: 'role', descending: false }">
                <template v-slot:top="props" class="bg-primary">
                    <div class="row justify-between" style="width:100%">
                        <div class="text-h4">Users</div>
                        <q-input v-model="filter" class="bg-grey-4" dense debounce="300" color="primary"
                            header-class="text-primary" filled label="Search..." clearable style="300px;">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </div>
                </template>
                <template v-slot:body-cell-role="props">
                    <q-td :props="props">
                        <div v-for="r in props.row.role">
                            <q-badge v-if="roles(r)[0].value === 'admin'" color="red">
                                {{ roles(r)[0].label }}
                            </q-badge>
                            <q-badge v-else color="blue">
                                {{ roles(r)[0].label }}
                            </q-badge>
                        </div>
                    </q-td>
                </template>
            </q-table>
            <transition name="slide-fade">
                <div v-if="selectedUser" style="width:100%">
                    <q-tabs v-model="currentTab" align="left" inline-label stretch class="q-pa-xs">
                        <q-tab name="profile" label="Profile" icon="person" />
                        <!-- <q-tab name="schedule" label="Schedule" icon="calendar_month" /> -->
                    </q-tabs>
                    <q-tab-panels v-model="currentTab" transition-next="jump-down" animated transition-prev="jump-down"
                        transition-duration="200">
                        <q-tab-panel name="profile" class="q-px-xs">
                            <UserProfile :user="selectedUser" />
                        </q-tab-panel>
                        <q-tab-panel name="schedule">
                            Schedule
                        </q-tab-panel>
                    </q-tab-panels>
                </div>
            </transition>
        </div>
    </div>
</template>
  
<script setup>
const au = useAllUsersData()
const selectedUser = ref()
const currentTab = ref('profile')
const filter = ref();

const columns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'station', label: 'Station', field: 'station', sortable: true, },
    { name: 'role', label: 'Role', field: '', sortable: true, },
    { name: 'email', label: 'Email', field: 'email', align: 'right' },
    { name: 'id', label: 'ID - For dev', field: 'uid', align: 'right' },
];

const onUserSelected = (event, row) => {
    selectedUser.value = row
}

</script>
<style scoped>
.slide-fade-enter-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
    transform: translateY(-50px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateY(200px);
    opacity: 0;
}
</style>