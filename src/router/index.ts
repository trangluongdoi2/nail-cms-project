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
            name: 'calendar',
            component: () => import('../views/calendar/CalendarList.vue'),
          },
          {
            path: ':id',
            name: 'calendar-detail',
            component: () => import('../views/calendar/CalendarDetail.vue'),
          },
        ],
      },
      {
        path: 'appointments',
        name: 'appointments',
        component: () => import('../views/appointments/index.vue'),
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('../views/reports/index.vue'),
      },
      {
        path: 'staffs',
        name: 'staffs',
        component: () => import('../views/staff/index.vue'),
      },
      {
        path: 'staffs/create',
        name: 'staff-create',
        component: () => import('../views/staff/StaffCreate.vue'),
      },
      {
        path: 'staffs/:id',
        name: 'staff-detail',
        component: () => import('../views/staff/StaffDetail.vue'),
      },
      {
        path: 'staffs/:id/edit',
        name: 'staff-edit',
        component: () => import('../views/staff/StaffEdit.vue'),
      },
      {
        path: 'services',
        name: 'services',
        component: () => import('../views/service-offering/index.vue'),
      },
      {
        path: 'services/create',
        name: 'service-create',
        component: () => import('../views/service-offering/ServiceCreate.vue'),
      },
      // {
      //   path: 'services/:id',
      //   name: 'service-detail',
      //   component: () => import('../views/staff/StaffDetail.vue'),
      // },
      // {
      //   path: 'services/:id/edit',
      //   name: 'service-edit',
      //   component: () => import('../views/staff/StaffEdit.vue'),
      // },
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
