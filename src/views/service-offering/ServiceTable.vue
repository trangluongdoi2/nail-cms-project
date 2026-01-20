<template>
  <div>
    <div class="mb-4 flex items-center gap-4">
      <el-input
        v-model="searchQuery"
        placeholder="Search by name..."
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

    <el-table v-loading="loading" :data="serviceList" stripe class="w-full">
      <el-table-column label="Name" min-width="250">
        <template #default="{ row }">
          <div class="flex items-center gap-3">
            <span>{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Code" min-width="250">
        <template #default="{ row }">
          <div class="flex items-center gap-3">
            <span>{{ row.code }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="price" label="Price" min-width="200">
        <template #default="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="specialties" label="Duration" min-width="200">
        <template #default="{ row }">
          <span>{{ row.duration }}</span>
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
        @size-change="fetchServiceList"
        @current-change="fetchServiceList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
// import { useRouter } from 'vue-router'
import type { IService } from '@/types/service'
import ServiceApi from '@/api/services'

// const router = useRouter()

const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const serviceList = ref<IService[]>([])

const pagination = reactive({
  page: 1,
  limit: 10,
  total: 0,
})

const fetchServiceList = async () => {
  loading.value = true
  try {
    const response = await ServiceApi.getAll({
      page: pagination.page,
      limit: pagination.limit,
      search: searchQuery.value || undefined,
      is_active: statusFilter.value ? statusFilter.value === 'true' : undefined,
    })
    console.log(response, 'response..')
    console.log(response.items, 'response.items...')
    serviceList.value = response.items
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
  fetchServiceList()
}

const handleEdit = (row: IService) => {
  // router.push({ name: 'service-edit', params: { id: row.id } })
}

const handleDelete = async (row: IService) => {
  try {
    await ElMessageBox.confirm(`Are you sure you want to delete?`, 'Confirm Delete', {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })

    await ServiceApi.deleteService(row.id)
    ElMessage.success('Staff member deleted successfully')
    fetchServiceList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete staff:', error)
      ElMessage.error('Failed to delete staff member')
    }
  }
}

onMounted(() => {
  fetchServiceList()
})
</script>
