<template>
  <div class="layout-container">
    <el-aside :width="isCollapse ? '64px' : '270px'" class="sidebar">
      <div class="sidebar-header">
        <div v-if="!isCollapse" class="logo">
          <span class="logo-icon"></span>
          <span class="logo-text">Nail Salon</span>
        </div>
        <span v-else class="logo-collapsed"></span>
        <el-button
          v-if="!isCollapse"
          :icon="Fold"
          text
          class="collapse-btn"
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
        <el-menu-item index="/">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>Dashboard</template>
        </el-menu-item>

        <el-menu-item index="/appointments">
          <el-icon><Calendar /></el-icon>
          <template #title>Appointments</template>
        </el-menu-item>
        <!-- <el-menu-item index="/customers">
          <el-icon><User /></el-icon>
          <template #title>Customers</template>
        </el-menu-item> -->
        <el-menu-item index="/services">
          <el-icon><IconMenu /></el-icon>
          <template #title>Services</template>
        </el-menu-item>

        <!-- <el-menu-item index="/products">
          <el-icon><ShoppingCart /></el-icon>
          <template #title>Products</template>
        </el-menu-item> -->
        <el-menu-item index="/gallery">
          <el-icon><Picture /></el-icon>
          <template #title>Gallery</template>
        </el-menu-item>
        <el-menu-item index="/staff">
          <el-icon><User /></el-icon>
          <template #title>Staff</template>
        </el-menu-item>
        <!-- <el-menu-item index="/reports">
          <el-icon><Document /></el-icon>
          <template #title>Reports</template>
        </el-menu-item> -->
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <template #title>Settings</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container class="main-container">
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
        <div class="header-right">
          <div class="user-info">
            <div class="user-name">Admin User</div>
            <div class="user-role">Administrator</div>
          </div>
          <el-avatar class="user-avatar" :size="40">A</el-avatar>
        </div>
      </el-header>

      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {
  Calendar,
  DataAnalysis,
  Expand,
  Fold,
  Menu as IconMenu,
  Picture,
  Search,
  Setting,
  User,
} from '@element-plus/icons-vue'
import { ref } from 'vue'

const isCollapse = ref<boolean>(false)

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.sidebar {
  background: linear-gradient(180deg, #5b4ff5 0%, #4a3fd9 100%);
  transition: width 0.3s;
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
}

.logo-collapsed {
  font-size: 28px;
}

.collapse-btn {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
}

.collapse-btn:hover {
  color: white;
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

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f7;
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

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  text-align: right;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
}

.user-role {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

.user-avatar {
  background: linear-gradient(135deg, #5b4ff5 0%, #7d72f7 100%);
  color: white;
  font-weight: 600;
}

.content {
  padding: 32px;
  overflow-y: auto;
  background-color: #f5f5f7;
}
</style>
