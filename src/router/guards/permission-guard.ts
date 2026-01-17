import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types/auth'

export const permissionGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  const requiredRoles = to.meta.roles as UserRole[] | undefined

  if (!requiredRoles || requiredRoles.length === 0) {
    return next()
  }

  console.log(authStore.isAuthenticated, 'authStore.isAuthenticated...')

  if (!authStore.isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // if (!authStore.hasRole(requiredRoles)) {
  //   return next({ name: 'Forbidden' })
  // }

  return next()
}
