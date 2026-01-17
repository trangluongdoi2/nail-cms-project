<template>
  <div class="flex h-screen w-full">
    <el-aside :width="isCollapse ? '64px' : '270px'" class="sidebar">
      <div class="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <div v-if="!isCollapse" class="flex flex-1 items-center gap-3">
          <span class="text-[28px]"></span>
          <span class="text-lg font-bold text-white tracking-tight">Nail Salon</span>
        </div>
        <span v-else class="text-[28px]"></span>
        <el-button
          v-if="!isCollapse"
          :icon="Fold"
          text
          class="sidebar-collapse-btn text-lg"
          @click="toggleSidebar"
        />
      </div>

      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        class="sidebar-menu"
      >
        <el-menu-item index="/calendar" class="test">
          <el-icon><Picture /></el-icon>
          <template #title>Calendar</template>
        </el-menu-item>
        <el-menu-item index="/appointments">
          <el-icon><Calendar /></el-icon>
          <template #title>Appointments</template>
        </el-menu-item>
        <el-menu-item index="/staff">
          <el-icon><User /></el-icon>
          <template #title>Staff</template>
        </el-menu-item>
        <el-menu-item index="/reports">
          <el-icon><Document /></el-icon>
          <template #title>Reports</template>
        </el-menu-item>
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <template #title>Settings</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container class="flex flex-1 flex-col bg-background">
      <el-header class="header">
        <el-input
          v-if="!isCollapse"
          placeholder="Search for anything..."
          :prefix-icon="Search"
          class="search-input"
          clearable
        />
        <div v-else>
          <el-button :icon="Expand" text @click="toggleSidebar" />
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <div class="text-sm font-semibold text-gray-800 leading-snug">Admin User</div>
            <div class="text-xs text-gray-500 leading-snug">Administrator</div>
          </div>
          <el-avatar class="user-avatar" :size="40">A</el-avatar>
        </div>
      </el-header>

      <el-main class="overflow-y-auto bg-background p-8">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {
  Calendar,
  Expand,
  Fold,
  Picture,
  Search,
  Setting,
  User,
  Document,
} from '@element-plus/icons-vue'
import { ref } from 'vue'

const isCollapse = ref<boolean>(false)

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<style scoped>
.sidebar {
  background: linear-gradient(180deg, #5b4ff5 0%, #4a3fd9 100%);
  transition: width 0.3s;
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

:deep(.sidebar-collapse-btn) {
  color: rgba(255, 255, 255, 0.8) !important;
}

:deep(.sidebar-collapse-btn:hover) {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.sidebar-menu {
  border-right: none;
  background: transparent;
  height: calc(100vh - 80px);
  padding: 12px;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 270px;
}

.sidebar-menu.el-menu--collapse {
  padding: 12px 8px;
}

:deep(.el-menu--collapse .el-menu-item) {
  display: flex;
  justify-content: center;
  padding: 0 !important;
}

:deep(.el-menu--collapse .el-menu-tooltip__trigger) {
  display: flex !important;
  justify-content: center !important;
  padding: 0 !important;
}

:deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  border-radius: 8px;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: all 0.2s;
}

:deep(.el-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
}

:deep(.el-menu-item.is-active) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  font-weight: 600;
}

:deep(.el-menu-item .el-icon) {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
}

:deep(.el-menu-item:hover .el-icon),
:deep(.el-menu-item.is-active .el-icon) {
  color: white;
}

.header {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  height: 80px !important;
}

.search-input {
  width: 400px;
}

:deep(.search-input .el-input__wrapper) {
  background-color: #f5f5f7;
  border-radius: 8px;
  box-shadow: none;
  border: none;
}

:deep(.search-input .el-input__inner) {
  font-size: 14px;
}

.user-avatar {
  background: linear-gradient(135deg, #5b4ff5 0%, #7d72f7 100%);
  color: white;
  font-weight: 600;
}
</style>
