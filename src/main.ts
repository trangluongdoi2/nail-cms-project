import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// Custom Element Plus theme to match Dribbble design
const elementPlusTheme = {
  '--el-color-primary': '#5B4FF5',
  '--el-color-primary-light-3': '#7D72F7',
  '--el-color-primary-light-5': '#9E97F9',
  '--el-color-primary-dark-2': '#4A3FD9',
  '--el-font-family': 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
}

// Apply theme variables
Object.entries(elementPlusTheme).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value)
})

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
