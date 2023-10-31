<template>
    <div class="row">
        <div class="col-6">
            <div>Current Role(s)</div>
            <q-list bordered separator>
                <q-item v-for="r in props.user.role">
                    <q-item-section class="q-pr-sm">{{ roles(r)[0].label }}</q-item-section>
                    <q-item-section avatar>
                        <q-icon color="primary" name="cancel" @click="removeRoles(r)" />
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <div class="col-6">
            <div>Add Role(s)</div>
            <q-select filled v-model="selectedNewRoles" multiple :options="allRoles" use-chips stack-label
                label="Select Role(s)" />
            <div><q-btn size="sm" outline color="primary" label="Add" @click="addRoles" /></div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['user'])
const selectedNewRoles = ref([])
const allRoles = roles()

const addRoles = () => {
    selectedNewRoles.value.forEach(async r => {
        await addRole(props.user, r.value)
    })
    selectedNewRoles.value = []
    // selectedUserRoles.value = selectedUser.value.role
}

const removeRoles = async (r) => {
    props.user.role = props.user.role.filter(function (rr) {
        return rr !== roles(r)[0].value;
    });
    await removeRole(props.user, roles(r)[0].value)
}

</script>