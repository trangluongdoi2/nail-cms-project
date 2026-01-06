import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  // {
  //   path: '/appointments',
  //   name: 'Appointments',
  //   component: () => import('../views/Appointments.vue'),
  // },
  // {
  //   path: '/customers',
  //   name: 'Customers',
  //   component: () => import('../views/Customers.vue'),
  // },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue'),
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('../views/Staff.vue'),
  },
  // {
  //   path: '/reports',
  //   name: 'Reports',
  //   component: () => import('../views/Reports.vue'),
  // },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
