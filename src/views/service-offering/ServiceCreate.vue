<template>
  <div>
    <div class="mb-6 flex justify-between">
      <div>
        <h1 class="text-2xl font-bold">Add Service</h1>
        <p class="mt-2 text-gray-600">Create a new service offering</p>
      </div>
      <div>
        <el-button @click="backToList">
          <el-icon class="mr-1"><ArrowLeft /></el-icon>
          Back
        </el-button>
      </div>
    </div>

    <el-card>
      <el-form
        ref="formRef"
        :model="serviceForm"
        :rules="rules"
        label-width="120px"
        label-position="left"
        class="max-w-150"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="serviceForm.name" placeholder="Enter service name" clearable />
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <el-input
            v-model="serviceForm.description"
            type="textarea"
            :rows="3"
            placeholder="Enter service description"
          />
        </el-form-item>

        <el-form-item label="Category" prop="category">
          <el-select v-model="serviceForm.category" placeholder="Select category" class="w-full">
            <el-option label="Nails" value="nails" />
            <el-option label="Spa" value="spa" />
            <el-option label="Waxing" value="waxing" />
            <el-option label="Facial" value="facial" />
            <el-option label="Massage" value="massage" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>

        <el-form-item label="Duration" prop="duration">
          <el-input-number
            v-model="serviceForm.duration"
            :min="5"
            :max="480"
            :step="5"
            placeholder="Duration in minutes"
            class="w-full"
          />
          <span class="ml-2 text-gray-500">minutes</span>
        </el-form-item>

        <el-form-item label="Price" prop="price">
          <el-input-number
            v-model="serviceForm.price"
            :min="0"
            :precision="2"
            :step="5"
            placeholder="Enter price"
            class="w-full"
          />
          <span class="ml-2 text-gray-500">USD</span>
        </el-form-item>

        <el-form-item label="Active Status">
          <el-switch v-model="serviceForm.is_active" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit(formRef)">
            Create Service
          </el-button>
          <el-button @click="handleReset(formRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import ServiceApi from '@/api/services'

interface ServiceForm {
  name: string
  description: string
  category: string
  duration: number
  price: number
  is_active: boolean
}

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref<boolean>(false)

const serviceForm = reactive<ServiceForm>({
  name: '',
  description: '',
  category: '',
  duration: 30,
  price: 0,
  is_active: true,
})

const rules = reactive<FormRules<ServiceForm>>({
  name: [
    { required: true, message: 'Please input service name', trigger: 'blur' },
    { min: 2, max: 100, message: 'Length should be 2 to 100', trigger: 'blur' },
  ],
  category: [{ required: true, message: 'Please select a category', trigger: 'change' }],
  duration: [{ required: true, message: 'Please input duration', trigger: 'blur' }],
  price: [{ required: true, message: 'Please input price', trigger: 'blur' }],
})

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await ServiceApi.create(serviceForm)
        ElMessage.success('Service created successfully')
        router.push({ name: 'services' })
      } catch (error) {
        console.error('Failed to create service:', error)
        ElMessage.error('Failed to create service')
      } finally {
        loading.value = false
      }
    } else {
      ElMessage.error('Please fill in all required fields correctly')
    }
  })
}

const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
}

const backToList = () => {
  router.push({ name: 'services' })
}
</script>
