<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Staff</h1>
      <el-button type="primary" @click="navigateToPageCreate">Add Staff Member</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'

const navigateToPageCreate = () => {
  router.push({ name: 'staff-create' })
}
</script>
<style scoped></style>
