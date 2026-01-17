import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { authGuard, permissionGuard } from './guards'
import MainLayout from '@/components/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginPage.vue'),
    meta: { public: true, name: 'login' },
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('../views/auth/ForbiddenPage.vue'),
    meta: { public: true, name: 'auth' },
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: 'calendar',
        component: () => import('../views/calendar/CalendarPage.vue'),
        children: [
          {
            path: '',
            name: 'CalendarList',
            component: () => import('../views/calendar/CalendarList.vue'),
          },
          {
            path: ':id',
            name: 'CalendarDetail',
            component: () => import('../views/calendar/CalendarDetail.vue'),
          },
        ],
      },
      {
        path: 'staff',
        name: 'Staff',
        component: () => import('../views/staff/index.vue'),
      },
      {
        path: 'staff/create',
        name: 'staff-create',
        component: () => import('../views/staff/StaffCreate.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)
router.beforeEach(permissionGuard)

export default router
