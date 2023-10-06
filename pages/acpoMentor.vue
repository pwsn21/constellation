<template>
  <div class="row justify-center">
    <div class="q-pa-md full-width" style="max-width: 850px;">
      <MentorPendingTable />
    </div>
  </div>
</template>

<script setup>

</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>