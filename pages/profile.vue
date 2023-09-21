<template>
    <div>
        <acpoView v-if="profileMode == 'acpoView'" @change="onChangeMode" />
        <acpoEdit v-if="profileMode == 'acpoEdit'" @change="onChangeMode" />
        <userEdit v-if="profileMode == 'userEdit'" @change="onChangeMode" />
    </div>
</template>

<script setup>

const profileMode = ref('acpoView')

const onChangeMode = (mode) => {
    profileMode.value = mode
}

console.log(profileMode.value)

</script>

<style scoped></style>