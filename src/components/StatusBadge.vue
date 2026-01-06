<template>
  <span :class="['status-badge', `status-${type}`]">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  type: 'paid' | 'rejected' | 'refunded' | 'disputed' | 'pending' | 'completed' | 'cancelled'
  label: string
}>()
</script>

<style scoped>
.status-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  text-align: center;
}

.status-paid,
.status-completed {
  background-color: #d1fae5;
  color: #065f46;
}

.status-rejected,
.status-cancelled {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-refunded {
  background-color: #ede9fe;
  color: #5b21b6;
}

.status-disputed,
.status-pending {
  background-color: #dbeafe;
  color: #1e40af;
}
</style>
