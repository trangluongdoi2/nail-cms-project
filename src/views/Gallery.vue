<script setup lang="ts"></script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gallery</h1>
      <el-button type="primary">Upload Images</el-button>
    </div>

    <el-card>
      <el-empty description="No images in gallery yet" />
    </el-card>
  </div>
</template>

<style scoped></style>
