<template>
    <div class="text-h5 text-primary row justify-around">
        <div>
            In Progress: {{ menteesCountInProgress.length }}
        </div>
        <div>
            Signed Off: {{ menteesCountSignedOff.length }}
        </div>
    </div>
    <pre></pre>
    <pre></pre>
</template>

<script setup>

const menteesCountInProgress = await optionsMenteeStatus('In Progress')
const menteesCountSignedOff = await optionsMenteeStatus('Signed Off')

</script>

<style scoped></style>