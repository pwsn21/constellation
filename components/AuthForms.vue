<template>
    <div class="row justify-center">
        <div class="q-mt-lg full-width" style="max-width: 500px;">
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
    </div>
</template>
<script setup>

const formType = ref("Login")

const onChangeForm = (form) => {
    formType.value = form
}

</script>