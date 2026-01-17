<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-300">403</h1>
      <h2 class="mt-4 text-2xl font-semibold text-gray-700">Access Forbidden</h2>
      <p class="mt-2 text-gray-500">You don't have permission to access this page.</p>
      <el-button type="primary" class="mt-6" @click="router.push('/')"> Go to Dashboard </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped></style>
