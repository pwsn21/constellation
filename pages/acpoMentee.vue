<template>
  <div>
    <MenteeFormAttendance v-if="formType == 'attendance'" />
  </div>
</template>


<script setup>
let formType = ref('attendance')

let currentTab = ref('menteeProgressTab')

</script>
