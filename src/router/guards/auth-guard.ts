import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const authGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && localStorage.getItem('access_token')) {
    await authStore.initialize()
  }

  const isPublicRoute = to.meta.public === true
  const isAuthenticated = authStore.isAuthenticated

  if (isPublicRoute) {
    if (isAuthenticated && to.name === 'Login') {
      return next({ name: 'Dashboard' })
    }
    return next()
  }

  if (!isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  return next()
}
