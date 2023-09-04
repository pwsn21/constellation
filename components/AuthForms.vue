<template>
    <div>

        <ClientOnly>

            <div v-if="formType == 'Register'">
                <formregister @change="onChangeForm" />
            </div>

            <div v-else>
                <formlogin @change="onChangeForm" />
            </div>
        </ClientOnly>

    </div>
</template>
<script setup>

const formType = ref("Login")

const onChangeForm = (form) => {
    formType.value = form
}

</script>