<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white px-4 py-8 shadow-lg">
      <div class="mb-8 text-center">
        <h1 class="mt-4 text-2xl font-bold text-gray-900">Nail Salon CMS</h1>
        <p class="mt-2 text-gray-500">Sign in to your account</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            size="large"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            size="large"
            :prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="rememberMe">Remember me</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="w-full"
            :loading="authStore.loading"
            @click="handleLogin"
          >
            Sign In
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import type { LoginRequest } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref<FormInstance>()
const form = reactive<LoginRequest>({
  email: '',
  password: '',
})
const rememberMe = ref(false)

const rules: FormRules<LoginRequest> = {
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
  ],
  password: [{ required: true, message: 'Please enter your password', trigger: 'blur' }],
}

const handleLogin = async () => {
  if (!formRef.value) {
    return
  }

  await formRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }

    if (rememberMe.value) {
      localStorage.setItem('remember_me', 'true')
      localStorage.setItem('remembered_email', form.email)
    } else {
      localStorage.removeItem('remember_me')
      localStorage.removeItem('remembered_email')
    }

    const success = await authStore.login(form)
    if (success) {
      ElMessage.success('Login successful!')
      router.push({ name: 'Dashboard' })
    } else {
      ElMessage.error('Invalid email or password')
    }
  })
}

onMounted(() => {
  const isRemembered = localStorage.getItem('remember_me') === 'true'
  if (isRemembered) {
    rememberMe.value = true
    const rememberedEmail = localStorage.getItem('remembered_email')
    if (rememberedEmail) {
      form.email = rememberedEmail
    }
  }
})
</script>

<style scoped>
:deep(.el-form-item__label) {
  font-weight: 500;
  color: #374151;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, #5b4ff5 0%, #4a3fd9 100%);
  border: none;
  border-radius: 8px;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #4a3fd9 0%, #3a2fc9 100%);
}
</style>
