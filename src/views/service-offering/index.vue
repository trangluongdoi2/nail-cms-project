<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Staff</h1>
      <el-button type="primary" @click="navigateToPageCreate">Add Service</el-button>
    </div>
    <ServiceTable />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ServiceTable from './ServiceTable.vue'

const router = useRouter()
const navigateToPageCreate = () => {
  router.push({ name: 'service-create' })
}
</script>
<style scoped></style>
