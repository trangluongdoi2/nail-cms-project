<script setup lang="ts"></script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Settings</h1>

    <el-card>
      <el-tabs>
        <el-tab-pane label="General" name="general">
          <el-form label-width="150px">
            <el-form-item label="Salon Name">
              <el-input placeholder="Enter salon name" />
            </el-form-item>
            <el-form-item label="Contact Email">
              <el-input placeholder="Enter contact email" />
            </el-form-item>
            <el-form-item label="Phone Number">
              <el-input placeholder="Enter phone number" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="Business Hours" name="hours">
          <el-empty description="Configure business hours" />
        </el-tab-pane>

        <el-tab-pane label="Notifications" name="notifications">
          <el-empty description="Configure notification settings" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped></style>
