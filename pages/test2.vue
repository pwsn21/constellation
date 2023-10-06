<template>
    <div>
        <pre>
{{ formattedString }}

        </pre>
    </div>
</template>

<script setup>
import { date } from 'quasar'

let menteeProfile = ref('')
menteeProfile.value = await (menteeData('0meA1S9c9yMoGYGjfoWUaJJrHQS2_2023-3'))
const formattedString = await dateLongFormat(menteeProfile.value.milestoneMeetingTwo)



</script>

<style lang="scss" scoped></style>