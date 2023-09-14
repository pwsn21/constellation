<template>
    <div>

        <ClientOnly>
            <div v-if="formType == 'Register'">
                <formRegister @change="onChangeForm" />
            </div>
            <div v-else-if="formType == 'passwordreset'">
                <formPasswordReset @change="onChangeForm" />
            </div>
            <div v-else>
                <formLogin @change="onChangeForm" />
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