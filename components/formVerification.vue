<template>
    <div class="flex justify-center">
        <div class="tw-w-1/2 tw-p-10">
            <q-card class="my-card">
                <q-card-section>
                    <div>Please verify your email to log in</div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-btn flat label="Resend Verification Email" @click="resendverification" />
                    <q-btn flat label="Go to Login Page" href="/" />
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>

<script setup>

const firebaseUser = useFirebaseUser()
const resendverification = verifyEmail(firebaseUser)

</script>

<style scoped></style>