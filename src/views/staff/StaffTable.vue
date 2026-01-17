<template>
  <div>
    <div class="mb-4 flex items-center gap-4">
      <el-input
        v-model="searchQuery"
        placeholder="Search by name or email..."
        clearable
        class="w-80"
        @clear="handleSearch"
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-select
        v-model="statusFilter"
        placeholder="Status"
        clearable
        class="w-32"
        @change="handleSearch"
      >
        <el-option label="Active" value="true" />
        <el-option label="Inactive" value="false" />
      </el-select>
    </div>

    <el-table v-loading="loading" :data="staffList" stripe class="w-full">
      <el-table-column label="Staff Member" min-width="250">
        <template #default="{ row }">
          <div class="flex items-center gap-3">
            <el-avatar :size="40" :src="row.image_url">
              {{ getInitials(row.first_name, row.last_name) }}
            </el-avatar>
            <div>
              <div class="font-medium">{{ row.first_name }} {{ row.last_name }}</div>
              <div class="text-sm text-gray-500">{{ row.email }}</div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="phone" label="Phone" width="150" />

      <el-table-column prop="specialties" label="Specialties" min-width="200">
        <template #default="{ row }">
          <div v-if="row.specialties?.length" class="flex flex-wrap gap-1">
            <el-tag v-for="specialty in row.specialties" :key="specialty" size="small" type="info">
              {{ specialty }}
            </el-tag>
          </div>
          <span v-else class="text-gray-400">-</span>
        </template>
      </el-table-column>

      <el-table-column prop="is_active" label="Status" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="row.is_active ? 'success' : 'danger'" size="small">
            {{ row.is_active ? 'Active' : 'Inactive' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Actions" width="150" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="handleEdit(row)">
            <el-icon><Edit /></el-icon>
            Edit
          </el-button>
          <el-button type="danger" link size="small" @click="handleDelete(row)">
            <el-icon><Delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="mt-4 flex justify-end">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.limit"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="fetchStaffList"
        @current-change="fetchStaffList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import type { Staff } from '@/types/staff'
import StaffApi from '@/api/staff'

const router = useRouter()

const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const staffList = ref<Staff[]>([])

const pagination = reactive({
  page: 1,
  limit: 10,
  total: 0,
})

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const fetchStaffList = async () => {
  loading.value = true
  try {
    const response = await StaffApi.getAll({
      page: pagination.page,
      limit: pagination.limit,
      search: searchQuery.value || undefined,
      is_active: statusFilter.value ? statusFilter.value === 'true' : undefined,
    })
    staffList.value = response.items
    pagination.total = response.total
  } catch (error) {
    console.error('Failed to fetch staff list:', error)
    ElMessage.error('Failed to load staff list')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchStaffList()
}

const handleEdit = (row: Staff) => {
  router.push({ name: 'staff-edit', params: { id: row.id } })
}

const handleDelete = async (row: Staff) => {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete ${row.first_name} ${row.last_name}?`,
      'Confirm Delete',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )

    await StaffApi.deleteStaff(row.id)
    ElMessage.success('Staff member deleted successfully')
    fetchStaffList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete staff:', error)
      ElMessage.error('Failed to delete staff member')
    }
  }
}

onMounted(() => {
  fetchStaffList()
})
</script>
