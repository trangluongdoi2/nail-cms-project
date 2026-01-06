export const API_URL =
  import.meta.env.VITE_BUILD_MODE === 'production'
    ? import.meta.env.VITE_DOMAIN_SERVER
    : (import.meta.env.VITE_API_URL as string)

export const AUTH_ENDPOINT = `${API_URL}/v1/users`
export const STATISTIC_ENDPOINT = `${API_URL}/v1/admin/statistic`
export const PROJECT_ENDPOINT = `${API_URL}/v1/admin/projects`
export const CLIENT_ENDPOINT = `${API_URL}/v1/clients`
