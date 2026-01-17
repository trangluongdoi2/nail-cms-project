<template>
  <div class="p-[20px]">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Add Staff Member</h1>
      <p class="text-gray-600 mt-2">Create a new staff member profile</p>
    </div>

    <el-card>
      <el-form
        ref="formRef"
        :model="staffForm"
        :rules="rules"
        label-width="120px"
        label-position="left"
        class="max-w-[600px]"
      >
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="staffForm.firstName" placeholder="Enter first name" clearable />
        </el-form-item>

        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="staffForm.lastName" placeholder="Enter last name" clearable />
        </el-form-item>

        <el-form-item label="email" prop="email">
          <el-input
            v-model="staffForm.email"
            type="email"
            placeholder="Enter email address"
            clearable
          />
        </el-form-item>

        <el-form-item label="phone" prop="phone">
          <el-input v-model="staffForm.phone" placeholder="Enter phone number" clearable />
        </el-form-item>

        <el-form-item label="Active Status">
          <el-switch v-model="staffForm.isActive" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit(formRef)">
            Create Staff
          </el-button>
          <el-button @click="handleReset(formRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface StaffForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  isActive: boolean
}

const formRef = ref<FormInstance>()
const loading = ref(false)

const staffForm = reactive<StaffForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  isActive: true,
})

const rules = reactive<FormRules<StaffForm>>({
  firstName: [
    { required: true, message: 'Please input first name', trigger: 'blur' },
    { min: 2, max: 50, message: 'Length should be 2 to 50', trigger: 'blur' },
  ],
  lastName: [
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

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  // @ts-ignore
  await formEl.validate((valid: any) => {
    if (valid) {
      loading.value = true
      console.log(staffForm, 'staffForm..')
      // setTimeout(() => {
      //   loading.value = false
      //   ElMessage.success('Staff member created successfully')
      //   console.log('Form submitted:', staffForm)
      // }, 1000)
    } else {
      ElMessage.error('Please fill in all required fields correctly')
      return false
    }
  })
}

const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<!-- <style scoped>
.staff-create-container {
  padding: 20px;
}

.staff-form {
  max-width: 600px;
}
</style> -->
