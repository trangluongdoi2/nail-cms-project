<template>
  <div>
    <h1 class="page-title">Dashboard</h1>

    <el-row :gutter="24" class="stats-row">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="never">
          <div class="stat-content">
            <div class="stat-icon-wrapper blue">
              <el-icon :size="28"><Calendar /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">24</div>
              <div class="stat-label">Today's Appointments</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="never">
          <div class="stat-content">
            <div class="stat-icon-wrapper green">
              <el-icon :size="28"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">342</div>
              <div class="stat-label">Total Customers</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="never">
          <div class="stat-content">
            <div class="stat-icon-wrapper orange">
              <el-icon :size="28"><ShoppingCart /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">$2,450</div>
              <div class="stat-label">Today's Revenue</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="never">
          <div class="stat-content">
            <div class="stat-icon-wrapper purple">
              <el-icon :size="28"><DataAnalysis /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">89%</div>
              <div class="stat-label">Capacity</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="content-row">
      <el-col :xs="24" :lg="16">
        <el-card class="data-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span class="card-title">Recent Appointments</span>
              <el-button type="primary" size="small">View All</el-button>
            </div>
          </template>
          <el-empty description="No recent appointments" :image-size="120" />
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card class="data-card" shadow="never">
          <template #header>
            <span class="card-title">Quick Actions</span>
          </template>
          <div class="quick-actions">
            <el-button type="primary" size="large" class="action-btn">
              <el-icon class="mr-2"><Calendar /></el-icon>
              New Appointment
            </el-button>
            <el-button size="large" class="action-btn">
              <el-icon class="mr-2"><User /></el-icon>
              Add Customer
            </el-button>
            <el-button size="large" class="action-btn">
              <el-icon class="mr-2"><DataAnalysis /></el-icon>
              View Reports
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { DataAnalysis, User, Calendar, ShoppingCart } from '@element-plus/icons-vue'
</script>

<style scoped>
.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 32px 0;
}

.stats-row {
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
  margin-bottom: 24px;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

:deep(.stat-card .el-card__body) {
  padding: 24px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrapper.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
}

.stat-icon-wrapper.green {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
}

.stat-icon-wrapper.orange {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
}

.stat-icon-wrapper.purple {
  background: linear-gradient(135deg, #5b4ff5 0%, #7d72f7 100%);
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.content-row {
  margin-bottom: 24px;
}

.data-card {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

:deep(.data-card .el-card__header) {
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.data-card .el-card__body) {
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  width: 100%;
  justify-content: flex-start;
  height: 48px;
  font-weight: 500;
  border-radius: 8px;
}

:deep(.action-btn .el-icon) {
  margin-right: 8px;
}
</style>
