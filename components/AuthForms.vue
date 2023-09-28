<template>
    <div class="row justify-center">
        <div class="q-pa-md full-width" style="max-width: 850px;">
            <q-card>
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
            </q-card>

        </div>
    </div>
</template>
<script setup>

const formType = ref("Login")

const onChangeForm = (form) => {
    formType.value = form
}

</script>