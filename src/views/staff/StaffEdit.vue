<template>
  <div v-loading="fetchLoading">
    <div class="mb-6 flex justify-between">
      <div>
        <h1 class="text-2xl font-bold">Edit Staff Member</h1>
        <p class="text-gray-600 mt-2">Update staff member information</p>
      </div>
      <div>
        <el-button @click="backToDetail">
          <el-icon class="mr-1"><ArrowLeft /></el-icon>
          Back
        </el-button>
      </div>
    </div>

    <el-card v-if="staff">
      <el-form
        ref="formRef"
        :model="staffForm"
        :rules="rules"
        label-width="120px"
        label-position="left"
        class="max-w-150"
      >
        <el-form-item label="First Name" prop="first_name">
          <el-input v-model="staffForm.first_name" placeholder="Enter first name" clearable />
        </el-form-item>

        <el-form-item label="Last Name" prop="last_name">
          <el-input v-model="staffForm.last_name" placeholder="Enter last name" clearable />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input
            v-model="staffForm.email"
            type="email"
            placeholder="Enter email address"
            clearable
          />
        </el-form-item>

        <el-form-item label="Phone" prop="phone">
          <el-input v-model="staffForm.phone" placeholder="Enter phone number" clearable />
        </el-form-item>

        <el-form-item label="Active Status">
          <el-switch v-model="staffForm.is_active" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit(formRef)">
            Save Changes
          </el-button>
          <el-button @click="handleReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-empty v-else-if="!fetchLoading" description="Staff member not found" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import type { Staff } from '@/types/staff'
import StaffApi from '@/api/staff'

interface StaffForm {
  first_name: string
  last_name: string
  email: string
  phone: string
  is_active: boolean
}

const route = useRoute()
const router = useRouter()

const formRef = ref<FormInstance>()
const fetchLoading = ref<boolean>(false)
const submitLoading = ref<boolean>(false)
const staff = ref<Staff | null>(null)

const staffForm = reactive<StaffForm>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  is_active: true,
})

const rules = reactive<FormRules<StaffForm>>({
  first_name: [
    { required: true, message: 'Please input first name', trigger: 'blur' },
    { min: 2, max: 50, message: 'Length should be 2 to 50', trigger: 'blur' },
  ],
  last_name: [
    { required: true, message: 'Please input last name', trigger: 'blur' },
    { min: 2, max: 50, message: 'Length should be 2 to 50', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
  ],
  phone: [
    { required: true, message: 'Please input phone number', trigger: 'blur' },
    {
      pattern: /^[\d\s()+-]+$/,
      message: 'Please input valid phone number',
      trigger: 'blur',
    },
  ],
})

const fetchStaffDetail = async () => {
  const id = route.params.id as string
  if (!id) {
    return
  }

  fetchLoading.value = true
  try {
    const { data } = await StaffApi.getById(id)
    staff.value = data
    Object.assign(staffForm, {
      first_name: staff.value.first_name,
      last_name: staff.value.last_name,
      email: staff.value.email,
      phone: staff.value.phone,
      is_active: staff.value.is_active,
    })
  } catch (error) {
    console.error('Failed to fetch staff detail:', error)
    ElMessage.error('Failed to load staff details')
  } finally {
    fetchLoading.value = false
  }
}

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true
      try {
        const id = route.params.id as string
        await StaffApi.update(id, staffForm)
        ElMessage.success('Staff member updated successfully')
        router.push({ name: 'staff-detail', params: { id } })
      } catch (error) {
        console.error('Failed to update staff:', error)
        ElMessage.error('Failed to update staff member')
      } finally {
        submitLoading.value = false
      }
    } else {
      ElMessage.error('Please fill in all required fields correctly')
    }
  })
}

const handleReset = () => {
  if (staff.value) {
    Object.assign(staffForm, {
      first_name: staff.value.first_name,
      last_name: staff.value.last_name,
      email: staff.value.email,
      phone: staff.value.phone,
      is_active: staff.value.is_active,
    })
  }
}

const backToDetail = () => {
  router.push({ name: 'staff-detail', params: { id: route.params.id } })
}

onMounted(() => {
  fetchStaffDetail()
})
</script>
