<template>
  <div v-loading="loading">
    <div class="mb-6 flex justify-between items-start">
      <div>
        <h1 class="text-2xl font-bold">IStaff Details</h1>
        <p class="text-gray-600 mt-2">View staff member information</p>
      </div>
      <div class="flex gap-2">
        <el-button @click="backToListStaff">
          <el-icon class="mr-1"><ArrowLeft /></el-icon>
          Back
        </el-button>
        <el-button type="primary" @click="handleEdit">
          <el-icon class="mr-1"><Edit /></el-icon>
          Edit
        </el-button>
      </div>
    </div>

    <el-card v-if="staff">
      <div class="flex gap-8">
        <div class="shrink-0">
          <el-avatar :size="120" :src="staff.image_url">
            {{ getInitials(staff.first_name, staff.last_name) }}
          </el-avatar>
        </div>

        <div class="flex-1">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
              <p class="text-lg">{{ staff.first_name }} {{ staff.last_name }}</p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Email</h3>
              <p class="text-lg">{{ staff.email }}</p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Phone</h3>
              <p class="text-lg">{{ staff.phone || '-' }}</p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <el-tag :type="staff.is_active ? 'success' : 'danger'" size="default">
                {{ staff.is_active ? 'Active' : 'Inactive' }}
              </el-tag>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Specialties</h3>
              <div v-if="staff.specialties?.length" class="flex flex-wrap gap-1">
                <el-tag
                  v-for="specialty in staff.specialties"
                  :key="specialty"
                  size="small"
                  type="info"
                >
                  {{ specialty }}
                </el-tag>
              </div>
              <p v-else class="text-gray-400">No specialties</p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Created At</h3>
              <p class="text-lg">{{ formatDate(staff.created_at) }}</p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
              <p class="text-lg">{{ formatDate(staff.updated_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-empty v-else-if="!loading" description="IStaff member not found" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft, Edit } from '@element-plus/icons-vue'
import type { IStaff } from '@/types/staff'
import StaffApi from '@/api/staff'
import { formatDate } from '@/utils/date'

const route = useRoute()
const router = useRouter()

const loading = ref<boolean>(false)
const staff = ref<IStaff | null>(null)

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const fetchStaffDetail = async () => {
  const id = route.params.id as string
  if (!id) {
    return
  }

  loading.value = true
  try {
    const { data } = await StaffApi.getById(id)
    staff.value = data
  } catch (error) {
    console.error('Failed to fetch staff detail:', error)
    ElMessage.error('Failed to load staff details')
  } finally {
    loading.value = false
  }
}

const backToListStaff = () => {
  router.push({ name: 'staff' })
}

const handleEdit = () => {
  router.push({ name: 'staff-edit', params: { id: route.params.id } })
}

onMounted(() => {
  fetchStaffDetail()
})
</script>
