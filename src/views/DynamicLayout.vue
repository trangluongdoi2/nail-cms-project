<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold text-gray-900">{{ pageTitle }}</h1>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index" :to="crumb.path">
            {{ crumb.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button v-if="showCreateButton" type="primary" :icon="Plus" @click="handleCreate">
        {{ createButtonText }}
      </el-button>
    </div>

    <div class="flex-1 overflow-y-auto p-6">
      <slot>
        <router-view />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Breadcrumb {
  title: string
  path?: string
}

interface Props {
  title?: string
  createRoute?: string
  createButtonText?: string
  showCreateButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  createRoute: '',
  createButtonText: 'Create New',
  showCreateButton: true,
})

const route = useRoute()
const router = useRouter()

const pageTitle = computed(() => {
  if (props.title) return props.title
  return (route.meta?.title as string) || route.name?.toString() || ''
})

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const crumbs: Breadcrumb[] = [{ title: 'Home', path: '/' }]

  if (route.matched && route.matched.length > 0) {
    route.matched.forEach((record) => {
      if (record.meta?.title || record.name) {
        crumbs.push({
          title: (record.meta?.title as string) || record.name?.toString() || '',
          path: record.path,
        })
      }
    })
  }

  return crumbs
})

const handleCreate = () => {
  if (props.createRoute) {
    router.push(props.createRoute)
  }
}
</script>

<style scoped>
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #6b7280;
}

:deep(.el-breadcrumb__inner) {
  font-weight: 400;
}

:deep(.el-breadcrumb__inner.is-link) {
  color: #5b4ff5;
  font-weight: 500;
}

:deep(.el-breadcrumb__inner.is-link:hover) {
  color: #4a3fd9;
}
</style>
