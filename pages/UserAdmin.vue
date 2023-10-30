<template>
    <div>
        <q-input v-model="filter" class="bg-grey-4" color="primary" header-class="text-primary" dense filled
            label="Search..." clearable />
        <q-table :filter="filter" :rows="au" :columns="columns" row-key="uid" @row-click="userSelection">
            <template v-slot:body-cell-role="props">
                <q-td :props="props">
                    <div v-for="r in props.row.role">
                        {{ roles(r)[0].label }}
                    </div>
                </q-td>
            </template>
        </q-table>
        <q-card>
            <q-card-section>
                <div><q-btn size="sm" outline color="primary" label="Clear All Roles" @click="clearAllRoles" /></div>
                <div><q-btn size="sm" outline color="primary" label="Add Test Roles" @click="addTestRoles" /></div>
            </q-card-section>
        </q-card>
        <q-card>
            <q-card-section>
                <div>
                    <span>Selected User: </span>
                    <span>{{ selectedUser ? selectedUser.name : "No User Selected" }} </span>
                </div>
                <hr />
                <div class="row" v-if="selectedUser">
                    <div class="col-6">
                        <div>Current Role(s)</div>
                        <q-list bordered separator>
                            <q-item v-for="r in selectedUserRoles">
                                <q-item-section class="q-pr-sm">{{ roles(r)[0].label }}</q-item-section>
                                <q-item-section avatar>
                                    <q-icon color="primary" name="cancel" @click="removeRoles(r)" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div class="col-6 q-pl-xs">
                        <div>Add Role(s)</div>
                        <q-select filled v-model="selectedNewRoles" multiple :options="allRoles" use-chips stack-label
                            label="Select Role(s)" />
                        <div><q-btn size="sm" outline color="primary" label="Add" @click="addRoles" /></div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>
<script setup>
initUsers();
const au = useAllUsersData();

const filter = ref()
const selectedUser = ref()
const selectedUserRoles = ref()

const columns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
    { name: 'role', label: 'Role', field: 'role', align: 'left', sortable: true, },
];

const userSelection = (event, row) => {
    selectedUser.value = row
    selectedUserRoles.value = selectedUser.value.role
};

const selectedNewRoles = ref([])

const allRoles = roles()

const addRoles = () => {

    selectedNewRoles.value.forEach(async r => {
        console.log("adding", r)
        await addRole(selectedUser.value, r.value)
    })
    selectedNewRoles.value = []
    selectedUserRoles.value = selectedUser.value.role
}

const removeRoles = async (r) => {
    console.log(roles(r)[0].value)
    selectedUserRoles.value = selectedUserRoles.value.filter(function (rr) {
        return rr !== roles(r)[0].value;
    });
    await removeRole(selectedUser.value, roles(r)[0].value)
}



</script>