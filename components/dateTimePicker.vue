<template>
    <div>
        <q-input filled clearable hide-bottom-space :label="label" :model-value="date" @update:model-value="updateType">
            <template #prepend>
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date :model-value="date" @update:model-value="updateType" :mask="mask" today-btn>
                            <q-btn v-close-popup flat label="close" />
                        </q-date>
                    </q-popup-proxy>
                </q-icon>
            </template>
            <template #append>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time :model-value="date" @update:model-value="updateType" :mask="mask" now-btn text-color="white"
                            color="primary" format24h>
                            <q-btn v-close-popup flat label="close" />
                        </q-time>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script setup>
const props = defineProps(['date', 'label']);

const emit = defineEmits(['update:date']);

const mask = "ddd, MM/DD/YYYY, HH:mm"

function updateType(date) {
    emit('update:date', date)
}
</script>

<style scoped></style>